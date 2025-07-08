namespace INNOTM.DTO
{
    public class UserResponce
    {
        public List<customDto> Result { get; set; }
        public string Response { get; set; }
        public string ResponseCode { get; set; }
    }


    public class customDto
    {
        public int UserId { get; set; }
        public string UserName { get; set; }
        public string PhoneNumber { get; set; }
    }
}
