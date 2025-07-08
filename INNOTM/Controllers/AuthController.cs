using Azure;
using INNOTM.Data;
using INNOTM.DTO;
using INNOTM.Models;
using Microsoft.AspNetCore.Mvc;

namespace INNOTM.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : Controller
    {
        public readonly AppDbContext _context;
        public AuthController(AppDbContext context)
        {
            _context = context;
        }
        [HttpPost("Register")]
        public ApiResponse Register(RegisterDto dto)
        {
            ApiResponse response = new ApiResponse();
            try
            {
                if (_context.Users.Any(u => u.PhoneNumber == dto.PhoneNumber))
                {
                    response.Result = null;
                    response.Response = "This phone number is already registered";
                    response.ResponseCode = "200";
                    return response;
                }
                var user = new User
                {
                    UserName = dto.Username,
                    Email = dto.Email,
                    PhoneNumber = dto.PhoneNumber,
                    Gender = dto.Gender,
                    Password = dto.Password,
                    ImageUrl = dto.ImageUrl,
                    Amount = 0,
                    IsAdmin = dto.IsAdmin
                };
                try
                {
                    _context.Users.Add(user);
                    _context.SaveChanges();

                    response.Result = user;
                    response.Response = "Registered successfully !";
                    response.ResponseCode = "200";
                }
                catch (Exception ex)
                {
                    response.Result = null;
                    response.Response = ex.ToString();
                    response.ResponseCode = "400";

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


        [HttpPost("login")]
        public ApiResponse login(LoginDto dto)
        {
            ApiResponse response = new ApiResponse();
            try
            {
                var user = _context.Users
                    .FirstOrDefault(u => u.PhoneNumber == dto.phoneNumber && u.Password == dto.password);
                if (user==null)
                {
                    response.Result = null;
                    response.Response = "Login failed, please enter valid phonenumber & password";
                    response.ResponseCode = "400";

                }
                else
                {
                    response.Result = user;
                    response.Response = "login successfully";
                    response.ResponseCode = "200";
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

    }
}
            
