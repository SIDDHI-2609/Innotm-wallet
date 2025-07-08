using INNOTM.Data;
using INNOTM.DTO;
using INNOTM.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.TagHelpers;

namespace INNOTM.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {

        public readonly AppDbContext _context;
        public UserController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet("all")]
        public ApiResponse GetAllUsers(string phoneNumber)
        {
            ApiResponse response = new ApiResponse();
            try
            {
                var user = _context.Users
                    .FirstOrDefault(u => u.PhoneNumber == phoneNumber);

                if (user == null || !user.IsAdmin)
                {
                    response.Result = null;
                    response.Response = "Only Admin Can access this.";
                    response.ResponseCode = "401";
                    return response;
                }
                else
                {
                    response.Result = user;
                    response.Response = "Record fetched successfully !!";
                    response.ResponseCode = "200";
                }

            }

            catch (Exception ex) {
                response.Result = null;
                response.Response = ex.ToString();
                response.ResponseCode = "400";
            }
            return response;
        }

        [HttpGet("balance")]

        public ApiResponse GetBalance(string phoneNumber)
        {
            ApiResponse response = new ApiResponse();
            try
            {
                var users = _context.Users
                    .FirstOrDefault(u => u.PhoneNumber == phoneNumber);
                if(users == null )
                {
                    response.Result = null;
                    response.Response = "Phone number not found";
                    response.ResponseCode = "401";
                    return response;
                }
                else
                {
                    response.Result = users;
                    response.Response = "Balance fetched succcessfully";
                    response.ResponseCode = "200";
                    return response;
                }
            }
            catch (Exception ex)
            {
                response.Result = null;
                response.Response = ex.ToString();
                response.ResponseCode = "400";
            }
            return response;
        }

        [HttpGet("basic-list")]

        public UserResponce GetBasicUserList()
        {
            UserResponce response = new UserResponce();
            try
            {
                var users = _context.Users
                    .Select(u => new customDto
                    {
                        UserId = u.UserId,
                        UserName = u.UserName,
                        PhoneNumber = u.PhoneNumber,
                    })
                    .ToList();
                response.Result = users;
                response.Response = "Balance Fetched Successfully";
                response.ResponseCode = "200";
            }
            catch (Exception ex)
            {
                response.Result = null;
                response.Response = ex.ToString();
                response.ResponseCode = "400";
            }
            return response;
            
        }
    }


    
}
