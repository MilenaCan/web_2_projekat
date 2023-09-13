using Web2_Projekat.Dto;

namespace Web2_Projekat.Interfaces.IServices
{
    public interface IAuthService
    {
        public Task<string> Login(LoginDto loginDTO);
        public Task Register(RegisterDto registerDTO);
    }
}
