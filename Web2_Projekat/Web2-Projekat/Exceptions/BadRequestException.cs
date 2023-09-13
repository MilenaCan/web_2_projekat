using System.Net;

namespace Web2_Projekat.Exceptions
{
    public class BadRequestException : BaseException
    {
        public BadRequestException(string message) : base(message, null, HttpStatusCode.BadRequest)
        {
        }
    }
}
