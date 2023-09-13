using System.Net;

namespace Web2_Projekat.Exceptions
{
    public class InternalServerErrorException : BaseException
    {
        public InternalServerErrorException(string message) : base(message, null, HttpStatusCode.InternalServerError)
        {
        }
    }
}
