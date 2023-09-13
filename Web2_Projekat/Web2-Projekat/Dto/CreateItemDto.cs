using System.ComponentModel.DataAnnotations;

namespace Web2_Projekat.Dto
{
    public class CreateItemDto
    {
        [Required, Range(0, int.MaxValue)]
        public int Amount { get; set; }
        [Required, Range(0, int.MaxValue)]
        public int ProductId { get; set; }
    }
}
