namespace INNOTM.DTO
{
    public class RegisterDto
    {
        public string Username { get; set; }
        public string Email { get; set; }

        public string PhoneNumber { get; set; }
       
        public string Gender { get; set; }
        public string Password { get; set; }

        public string ImageUrl { get; set; }
        public bool IsAdmin { get; set; }
    }


    public class LoginDto
    {
        public string phoneNumber { get; set; }
        public string password { get; set; }
    }

}
