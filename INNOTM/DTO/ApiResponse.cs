using INNOTM.Models;
using Microsoft.SqlServer.Server;

namespace INNOTM.DTO
{
    public class ApiResponse
    {
        public User Result { get; set; }
        public String Response {  get; set; }
        public String ResponseCode { get; set; }
    }
}
