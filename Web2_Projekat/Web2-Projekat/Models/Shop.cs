namespace Web2_Projekat.Models
{
    public class Shop
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public long UserId { get; set; }
        public double DeliveryPrice { get; set; }
    }
}
