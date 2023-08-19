using Web2_Projekat.Enumerations;

namespace Web2_Projekat.Dto
{
    public class UserDto
    {
        public long Id { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string ConfirmPassword { get; set; }
        public string Name { get; set; }
        public string Lastname { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string Address { get; set; }
        public string Photo { get; set; }
        public UserType UserType { get; set; }
        public VerificationStatus VerificationStatus { get; set; }
   
    }
}
