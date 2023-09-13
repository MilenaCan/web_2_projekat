using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Web2_Projekat.Dto;
using Web2_Projekat.Interfaces.IServices;

namespace Web2_Projekat.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        IAuthService _authService;
        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDto loginDTO)
        {
            var token = await _authService.Login(loginDTO);
            return Ok(token);
        }

        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromForm] RegisterDto registerDTO)
        {
            await _authService.Register(registerDTO);
            return Ok();
        }
    }
}
