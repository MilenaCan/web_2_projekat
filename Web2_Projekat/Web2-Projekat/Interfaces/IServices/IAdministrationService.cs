using Web2_Projekat.Dto;

namespace Web2_Projekat.Interfaces.IServices
{
    public interface IAdministrationService
    {
        public Task<List<OrderDto>> GetAllOrders();
        public Task<List<UserDto>> GetWaitingUsers();
        public Task<List<UserDto>> GetVerifiedUsers();
        public Task<List<UserDto>> GetBuyers();
        public Task<List<UserDto>> GetDeclinedUsers();
        public Task SetUserStatus(VerifyDto verifyDTO);
    }
}
