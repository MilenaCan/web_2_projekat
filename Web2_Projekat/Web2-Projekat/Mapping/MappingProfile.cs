using AutoMapper;
using Web2_Projekat.Dto;
using Web2_Projekat.Models;

namespace Web2_Projekat.Mapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile() {
            CreateMap<User, UserDto>().ReverseMap();
        }
    }
}
