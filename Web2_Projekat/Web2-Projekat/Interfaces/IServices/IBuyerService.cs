using Web2_Projekat.Dto;

namespace Web2_Projekat.Interfaces.IServices
{
    public interface IBuyerService
    {
        public Task<List<ProductDto>> GetProducts();

        public Task CreateOrder(CreateOrderDto createOrder, int userId);
        public Task CancelOrder(int userId, int id);
        public Task<List<OrderDto>> GetMyOrders(int userId);
        public Task<double> GetPrice(List<CreateItemDto> items);
    }
}
