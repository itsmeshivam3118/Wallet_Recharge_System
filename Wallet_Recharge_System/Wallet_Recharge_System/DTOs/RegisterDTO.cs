using System.ComponentModel.DataAnnotations;

namespace Wallet_Recharge_System.DTOs
{
    public class RegisterDTO
    {
        [Required]
        public string Name { get; set; }

        [Required]
        [EmailAddress(ErrorMessage = "Invalid email format")]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }

        [Required]
        [RegularExpression("^(Admin|User)$", ErrorMessage = "Role must be Admin or User")]
        public string Role { get; set; } // "Admin" or "User"
    }
}