using INNOTM.Data;
using INNOTM.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OpenAI;
using OpenAI_API;
using System.Reflection;
using System.Text.Json;
using System.Text.RegularExpressions;


namespace INNOTM.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class ChatController : Controller
    {
        private readonly AppDbContext _context;
        private readonly IConfiguration _config;

        public ChatController(AppDbContext context, IConfiguration config)
        {
            _context = context;
            _config = config;
        }
        [HttpGet("ask")]
        public async Task<IActionResult> Ask([FromQuery] string question, [FromQuery] string phoneNumber)
        {
            if (string.IsNullOrWhiteSpace(phoneNumber))
                return BadRequest("Phone number is required.");

            var user = _context.Users.FirstOrDefault(u => u.PhoneNumber == phoneNumber);
            if (user == null)
                return NotFound("User not found.");

            var originalAmount = user.Amount;
            string systemReply = "";

            // Step 1: Check if it's a transfer request
            if (question.ToLower().Contains("transfer") || question.ToLower().Contains("send"))
            {
                var normalized = question.ToLower();

                // Match amount + 10-digit phone
                var phoneMatch = Regex.Match(normalized,
               @"(?:transfer|send|please\s*transfer|can you transfer|please send)?\D*(\d+)\D*(\d{10})");

                // Match amount + username (e.g. transfer 500 to ritesh)
                var userMatch = Regex.Match(normalized,
                @"(?:transfer|send|please\s*transfer|can you transfer|please send)?\D*(\d+)\D*(?:to\s+)?([a-zA-Z0-9_]+)");


                decimal amountToTransfer = 0;
                string recipientPhone = null;
                string recipientUsername = null;

                if (phoneMatch.Success)
                {
                    amountToTransfer = decimal.Parse(phoneMatch.Groups[1].Value);
                    recipientPhone = phoneMatch.Groups[2].Value;
                }
                else if (userMatch.Success)
                {
                    amountToTransfer = decimal.Parse(userMatch.Groups[1].Value);
                    recipientUsername = userMatch.Groups[2].Value;
                }
                else
                {
                    return BadRequest("Invalid transfer format. Try: 'transfer 100 to 9876543210' or 'send 100 to ritesh'.");
                }

                if (amountToTransfer <= 0)
                    return BadRequest("Amount must be greater than zero.");

                if (user.Amount < amountToTransfer)
                    return BadRequest("Insufficient balance.");

                // Find recipient by phone or username
                User recipient = null;

                if (!string.IsNullOrEmpty(recipientPhone))
                    recipient = _context.Users.FirstOrDefault(u => u.PhoneNumber == recipientPhone);

                else if (!string.IsNullOrEmpty(recipientUsername))
                    recipient = _context.Users.FirstOrDefault(u => u.UserName.ToLower() == recipientUsername.ToLower());

                if (recipient == null)
                    return NotFound("Recipient not found.");

                // Perform transaction
                user.Amount -= amountToTransfer;
                recipient.Amount += amountToTransfer;

                _context.Transactions.Add(new Transaction
                {
                    UserId = user.UserId,
                    ReceiverId = recipient.UserId,
                    TransactionType = "Debit",
                    InitialAmount = user.Amount,
                    TransferAmount = amountToTransfer
                });

                _context.Transactions.Add(new Transaction
                {
                    UserId = recipient.UserId,
                    ReceiverId = user.UserId,
                    TransactionType = "Credit",
                    InitialAmount = recipient.Amount,
                    TransferAmount = amountToTransfer
                });

                _context.SaveChanges();

                systemReply = $"₹{amountToTransfer} has been successfully transferred to " +
                    $"{(recipientPhone ?? recipient.UserName)}. Your new balance is ₹{user.Amount}.";
            }

            // Step 2: Prepare data for assistant reply
            var userInfoJson = JsonSerializer.Serialize(new
            {
                user.UserName,
                user.PhoneNumber,
                AmountInRupees = $"₹{user.Amount}"
            });

            var apiKey = _config["OpenAI:ApiKey"];
            var openAi = new OpenAIAPI(apiKey);
            var chat = openAi.Chat.CreateConversation();
            chat.AppendSystemMessage("You are a helpful assistant that answers customer queries based " +
                "on their wallet balance and helps transfer money to other users.");
            chat.AppendUserInput($"User asked: \"{question}\". The user info is: {userInfoJson}. {systemReply}");
            dynamic response = null;
            try
            {
                response = await chat.GetResponseFromChatbotAsync();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }

            return Ok(new { reply = response });
        }

    }
}



