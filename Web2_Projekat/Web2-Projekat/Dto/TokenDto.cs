using System.ComponentModel.DataAnnotations;

namespace Web2_Projekat.Dto
{
    public class TokenDto
    {
        [Required]
        public string? Token { get; set; }
    }
}
