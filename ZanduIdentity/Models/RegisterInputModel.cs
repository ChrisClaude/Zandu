using System.ComponentModel.DataAnnotations;

namespace ZanduIdentity.Models
{
    public class RegisterInputModel
    {
        [Required]
        [StringLength(100, MinimumLength = 3, ErrorMessage = "Maximum 30 characters")]
        [Display(Name = "Username")]
        public string UserName { get; set; }
        
        [Required]
        [EmailAddress]
        [Display(Name = "Email")]
        public string Email { get; set; }

        [Required]
        [StringLength(100, ErrorMessage = "The {0} must be at least {2} and at max {1} characters long.", MinimumLength = 6)]
        [DataType(DataType.Password)]
        public string Password { get; set; }
            
        [DataType(DataType.Password)]
        [Display(Name = "Confirm password")]
        [Compare("Password", ErrorMessage = "The password and confirmation password do not match.")]
        public string ConfirmPassword { get; set; }
    }
}