using System.ComponentModel.DataAnnotations;

namespace Web2_Projekat.Dto
{
    public class LoginDto
    {
        [Required, MaxLength(100)]
        public string? Email { get; set; }
        [Required, MaxLength(100)]
        public string? Password { get; set; }
    }
}
