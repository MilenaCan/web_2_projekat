﻿using System.ComponentModel.DataAnnotations;
using Web2_Projekat.Models;

namespace Web2_Projekat.Dto
{
    public class RegisterDto
    {
        [Required, MaxLength(100), RegularExpression("[a-zA-Z0-9]+")]
        public string? Username { get; set; }
        [Required, MaxLength(100)]
        public string? Password { get; set; }
        [Required, MaxLength(100), EmailAddress]
        public string? Email { get; set; }
        [Required, MaxLength(100)]
        public string? FullName { get; set; }
        [Required]
        public DateTime Birthday { get; set; }
        [Required, MaxLength(200)]
        public string? Address { get; set; }
        [Required]
        public UserType Type { get; set; }
        public IFormFile? ImageFile { get; set; }
    }
}
