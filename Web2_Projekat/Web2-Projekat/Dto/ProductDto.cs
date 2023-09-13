using System.ComponentModel.DataAnnotations;

namespace Web2_Projekat.Dto
{
    public class ProductDto : CreateProductDto
    {
        [Required]
        public int Id { get; set; }
        public int SellerId { get; set; }
        public SellerDto? Seller { get; set; }
    }
}
