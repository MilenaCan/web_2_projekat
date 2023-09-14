using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Web2_Projekat.Dto;
using Web2_Projekat.Exceptions;
using Web2_Projekat.Interfaces.IServices;

namespace Web2_Projekat.Controllers
{
    public class ProfileController : Controller
    {
        IProfileService _profileService;
        public ProfileController(IProfileService profileService)
        {
            _profileService = profileService;
        }

        [Authorize]
        [HttpGet]
        public async Task<IActionResult> GetProfile()
        {
            if (!int.TryParse(User.Claims.First(c => c.Type == "Id").Value, out int id))
                throw new BadRequestException("Bad ID. Logout and login.");

            var profile = await _profileService.GetProfile(id);
            return Ok(profile);
        }

        [Authorize]
        [HttpPut]
        public async Task<IActionResult> EditProfile([FromForm] EditProfileDto editProfileDTO)
        {
            if (!int.TryParse(User.Claims.First(c => c.Type == "Id").Value, out int id))
                throw new BadRequestException("Bad ID. Logout and login.");

            await _profileService.EditProfile(id, editProfileDTO);
            return Ok();
        }
    }
}
