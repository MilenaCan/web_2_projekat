using Microsoft.CodeAnalysis.Scripting;
using BCrypt.Net;

namespace Web2_Projekat.Helper
{
    public class HashPassword
    {
        public static string Hashpassword(string password)
        {
            return BCrypt.Net.BCrypt.HashPassword(password);
        }
    }
}
