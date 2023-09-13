using System.Net;

namespace Web2_Projekat.Exceptions
{
    public class NotFoundException : BaseException
    {
        public NotFoundException(string message) : base(message, null, HttpStatusCode.NotFound)
        {
        }
    }
}
