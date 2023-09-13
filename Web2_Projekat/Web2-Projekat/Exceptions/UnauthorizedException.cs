using System.Net;

namespace Web2_Projekat.Exceptions
{
    public class UnauthorizedException : BaseException
    {
        public UnauthorizedException(string message) : base(message, null, HttpStatusCode.Unauthorized)
        {
        }
    }
}
