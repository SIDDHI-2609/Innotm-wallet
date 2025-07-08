using INNOTM.Data;
using INNOTM.DTO;
using Microsoft.AspNetCore.Mvc;

namespace INNOTM.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class WalletController : ControllerBase
    {
        public readonly AppDbContext _context;
        public WalletController(AppDbContext context)
        {
            _context = context;
        }


        [HttpPost("add")]
        public ApiResponse Add(WalletAdd dto)
        {
            ApiResponse apiResponse = new ApiResponse();
            try
            {
                var user = _context.Users
                     .FirstOrDefault(u => u.PhoneNumber == dto.PhoneNumber);
                if (user != null)
                {
                    user.Amount += dto.amount;

                    _context.Transactions.Add(new INNOTM.Models.Transaction
                    {
                        UserId = user.UserId,
                        ReceiverId = user.UserId,
                        TransactionType = "wallet",
                        InitialAmount = user.Amount - dto.amount,
                        TransferAmount = dto.amount,
                    });

                    _context.SaveChanges();

                    apiResponse.Response = "Money added successfully.";
                    apiResponse.Result = user;
                    return apiResponse;
                }
                else
                {
                    apiResponse.Response = "User not found.";
                    apiResponse.ResponseCode = "400";
                    return apiResponse;
                }
            }
            catch (Exception ex)
            {
                apiResponse.Response = $"Error: {ex.Message}";
                return apiResponse;
            }
        }

        
    }
}
