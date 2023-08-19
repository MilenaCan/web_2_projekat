using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Web2_Projekat.Data;
using Web2_Projekat.Dto;
using Web2_Projekat.Interfaces;
using Web2_Projekat.Models;

namespace Web2_Projekat.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RegistrationController : ControllerBase

    {
        private readonly IUserService _userService;
       

        public RegistrationController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost("registration")]
        public async Task<IActionResult> Registration([FromBody] UserDto registerUserDto) {

            ResponseDto responseDto = await _userService.Registration(registerUserDto);

            if (responseDto.UserDto == null)
            {
                return BadRequest(responseDto.Result);
            }

            
            responseDto.UserDto.Password = registerUserDto.Password;
            return Ok(responseDto);
            
        }
    }
}
