using Web2_Projekat.Dto;

namespace Web2_Projekat.Interfaces.IServices
{
    public interface IProfileService
    {
        public Task<UserDto> GetProfile(int id);
        public Task EditProfile(int id, EditProfileDto profile);
    }
}
