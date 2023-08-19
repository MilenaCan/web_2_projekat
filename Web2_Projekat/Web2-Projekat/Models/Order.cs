namespace Web2_Projekat.Models
{
    public class Order
    {
        public long Id { get; set; }
        public long ArticleId { get; set; }
        OrderStatus Status { get; set; }
        public long CartId { get; set; }
    }
}
