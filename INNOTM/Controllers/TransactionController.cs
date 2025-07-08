using INNOTM.Data;
using INNOTM.DTO;
using Microsoft.AspNetCore.Mvc;

namespace INNOTM.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TransactionController : Controller
    {
        public readonly AppDbContext _context;
        public TransactionController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost("PayMoney")]
        public ApiResponse PayMoney(PayMoneyDto dto)
        {
            ApiResponse response = new ApiResponse();
            try
            {
                var sender = _context.Users.FirstOrDefault(u => u.PhoneNumber == dto.senderPhoneNumber);
                var receiver = _context.Users.FirstOrDefault(u => u.PhoneNumber == dto.receiverPhonenumber);

                if (sender == null || receiver == null)
                {
                    response.Result = null;
                    response.Response = "Invalid sender or receiver";
                    response.ResponseCode = "400";
                    return response;

                }
                if (sender.Amount < dto.amount)
                {
                    response.Result = null;
                    response.Response = "insufficient balance";
                    response.ResponseCode = "200";
                    return response;
                }
                decimal senderInitial = sender.Amount;
                decimal receiverInitial = receiver.Amount;

                sender.Amount -= dto.amount;
                receiver.Amount += dto.amount;

                _context.Transactions.Add(new INNOTM.Models.Transaction
                {
                    UserId = sender.UserId,
                    ReceiverId = receiver.UserId,
                    TransactionType = "debit",
                    InitialAmount = senderInitial,
                    TransferAmount = dto.amount
                });

                _context.Transactions.Add(new INNOTM.Models.Transaction
                {
                    UserId = receiver.UserId,
                    ReceiverId = sender.UserId,
                    TransactionType = "credit",
                    InitialAmount = receiverInitial,
                    TransferAmount = dto.amount
                });

                _context.SaveChanges();
                response.Result = null;
                response.Response = "Amount transfered successfully";
                response.ResponseCode = "200";
                return response;
            }
            catch (Exception ex)
            {
                response.Result = null;
                response.Response = ex.ToString();
                response.ResponseCode = "400";
                return response;
            }

           // return response;
        }

        [HttpGet("history")]
        public TransactionResponce GetHistory(string phoneNumber)
        {
            TransactionResponce responce = new TransactionResponce();
            List<TransactionCustom> reList = new List<TransactionCustom>();
            TransactionCustom obj = new TransactionCustom();
            try
            {
                var user = _context.Users.FirstOrDefault(u => u.PhoneNumber == phoneNumber);
                if(user==null)
                {
                    responce.Result = null;
                    responce.response = " user not found";
                    responce.responseCode = "200";
                    return responce;
                }
                else
                {
                    var history = _context.Transactions
                        .Where(t => t.UserId == user.UserId)
                        .OrderByDescending(t => t.TransactionDate).ToList();

                    foreach (var transaction in history)
                    {
                        obj = new TransactionCustom();
                        var Receiveruserdata = _context.Users.Where(u => u.UserId == transaction.ReceiverId).FirstOrDefault();
                        obj.TransactionDate = transaction.TransactionDate;
                        obj.UserId = transaction.UserId;
                        obj.TransactionId = transaction.TransactionId;
                        obj.ReceiverPhoneNumber = Receiveruserdata.PhoneNumber;
                        obj.ReceiverName = Receiveruserdata.UserName;
                        obj.TransactionType = transaction.TransactionType;
                        obj.ReceiverId = transaction.ReceiverId;
                        obj.InitialAmount = transaction.InitialAmount;
                        obj.TransferAmount = transaction.TransferAmount;

                        reList.Add(obj);

                    }
                    responce.Result = reList;
                    responce.response = " history fetched successfully";
                    responce.responseCode = "200";
                    return responce;
                }
            }
            catch (Exception ex)
            {
                responce.Result = null;
                responce.response = ex.ToString();
                responce.responseCode = "400";
            }
            return responce;
        }
        [HttpDelete("DeleteTransactionById")]
        public TransactionResponce DeleteTransactionById(int tid)
        {
            TransactionResponce responce = new TransactionResponce();
            try
            {
                var transactions = _context.Transactions.Where(t => t.TransactionId == tid);
                _context.Transactions.RemoveRange(transactions);
                _context.SaveChanges();
                responce.Result = null;
                responce.response = " Transaction record deleted";
                responce.responseCode = "200";
                return responce;
            }
            catch(Exception ex)
            {
                responce.Result = null;
                responce.response = ex.ToString();
                responce.responseCode = "400";
            }
            return responce;


        }


        [HttpDelete("DeleteAllHistory")]
        public TransactionResponce DeleteHistory(string phoneNumber)
        {
            TransactionResponce responce = new TransactionResponce();
            try
            {
                var user = _context.Users.FirstOrDefault(u => u.PhoneNumber == phoneNumber);
                if (user == null)
                {
                    responce.Result = null;
                    responce.response = " User not found";
                    responce.responseCode = "200";
                    return responce;
                }
                else
                {
                    var transactions = _context.Transactions.Where(t => t.UserId == user.UserId);
                    _context.Transactions.RemoveRange(transactions);
                    _context.SaveChanges();

                    responce.Result = null;
                    responce.response = " Transaction history deleted";
                    responce.responseCode = "200";
                    return responce;
                }
            }
            catch (Exception ex)
            {
                responce.Result = null;
                responce.response = ex.ToString();
                responce.responseCode = "400";
            }
            return responce;


        }


    }
}
