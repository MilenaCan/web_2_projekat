using Web2_Projekat.Dto;

namespace Web2_Projekat.Interfaces.IServices
{
    public interface ISellerInterface
    {
        public Task<List<ProductDto>> GetProducts(int userId);
        public Task<ProductDto> GetProduct(int id, int userId);
        public Task DeleteProduct(int id, int userId);
        public Task UpdateProduct(int id, ProductDto product, int userId);
        public Task AddProduct(CreateProductDto product, int userId);
        public Task<List<OrderDto>> GetOrders(int userId);
        public Task<List<OrderDto>> GetNewOrders(int userId);
        public Task Approve(int userId, int orderId);
    }
}
