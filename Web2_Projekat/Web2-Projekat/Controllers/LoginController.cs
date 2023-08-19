using Microsoft.AspNetCore.Mvc;
using Web2_Projekat.Dto;
using Web2_Projekat.Interfaces;

namespace Web2_Projekat.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly IUserService _userService;

        public LoginController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto loginUserDto)
        {
            ResponseDto responseDto = await _userService.Login(loginUserDto);
            if (responseDto.UserDto == null)
            {
                return BadRequest(responseDto.Result);
            }

            responseDto.UserDto.Password = loginUserDto.Password;
            return Ok(responseDto);
        }
    }
}
