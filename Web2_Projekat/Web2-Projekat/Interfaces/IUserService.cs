using Web2_Projekat.Dto;

namespace Web2_Projekat.Interfaces
{
    public interface IUserService
    {
        Task<ResponseDto> Registration(UserDto newUser);

        Task<ResponseDto> Login(LoginDto loginUserDto);
    }
}
