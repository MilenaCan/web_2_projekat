﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using Web2_Projekat.Dto;
using Web2_Projekat.Interfaces.IServices;

namespace Web2_Projekat.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        IAdministrationService _administrationService;

        public AdminController(IAdministrationService administrationService)
        {
            _administrationService = administrationService;
        }

        [Authorize(Roles = "Administrator")]
        [HttpGet("verified-users")]
        public async Task<IActionResult> GetVerifiedUsers()
        {
            var users = await _administrationService.GetVerifiedUsers();
            return Ok(users);
        }

        [Authorize(Roles = "Administrator")]
        [HttpGet("waiting-users")]
        public async Task<IActionResult> GetWaitingUsers()
        {
            var users = await _administrationService.GetWaitingUsers();
            return Ok(users);
        }

        [Authorize(Roles = "Administrator")]
        [HttpGet("declined-users")]
        public async Task<IActionResult> GetDeclinedUsers()
        {
            var users = await _administrationService.GetDeclinedUsers();
            return Ok(users);
        }

        [Authorize(Roles = "Administrator")]
        [HttpGet("buyers")]
        public async Task<IActionResult> GetBuyers()
        {
            var users = await _administrationService.GetBuyers();
            return Ok(users);
        }

        [Authorize(Roles = "Administrator")]
        [HttpPost("verify-user")]
        public async Task<IActionResult> GetWaitngUsers(VerifyDto verifyDTO)
        {
            await _administrationService.SetUserStatus(verifyDTO);
            return Ok();
        }

        [Authorize(Roles = "Administrator")]
        [HttpGet("orders")]
        public async Task<IActionResult> GetAllOrders()
        {
            var orders = await _administrationService.GetAllOrders();
            return Ok(orders);
        }
    }
}
