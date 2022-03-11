using AutoMapper;
using ZanduIdentity.Dtos.UsersDto;
using ZanduIdentity.Models;

namespace ZanduIdentity.Profiles
{
    public class UsersProfile : Profile
    {
        public UsersProfile()
        {
            CreateMap<ApplicationUser, UserReadDto>();
            CreateMap<UserCreateDto, ApplicationUser>();
            CreateMap<UserUpdateDto, ApplicationUser>();
            CreateMap<ApplicationUser, ApplicationUser>();
        }
    }
}