using System;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.Extensions.Logging;
using ZanduIdentity.Models;

namespace ZanduIdentity.Register
{
    [Route("account/register")]
    [SecurityHeaders]
    [AllowAnonymous]
    public class RegisterController : Controller
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly ILogger<RegisterController> _logger;

        public RegisterController(
            UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signInManager,
            ILogger<RegisterController> logger)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _logger = logger;
        }

        [HttpGet]
        public IActionResult Index()
        {
            return View("Register");
        }

        /// <summary>
        /// Handle form submission for user registration
        /// </summary>
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Register([Bind(Prefix = "RegisterInput")] RegisterInputModel inputModel)
        {
            _logger.LogInformation($"email: {inputModel.Email}");
            if (ModelState.IsValid)
            {
                var user = new ApplicationUser { UserName = inputModel.UserName, Email = inputModel.Email };
                var result = await _userManager.CreateAsync(user, inputModel.Password);

                if (result.Succeeded)
                {
                    _logger.LogInformation("User created a new account with password");
                    // var code = await _userManager.GenerateEmailConfirmationTokenAsync(user);
                    // code = WebEncoders.Base64UrlEncode(Encoding.UTF8.GetBytes(code));
                    // var callbackUrl = Url.Page(
                    //     "/Account/ConfirmEmail",
                    //     pageHandler: null,
                    //     values: new { area = "Identity", userId = user.Id, code = code, returnUrl = returnUrl },
                    //     protocol: Request.Scheme);
                    //
                    // await _emailSender.SendEmailAsync(Input.Email, "Confirm your email",
                    //     $"Please confirm your account by <a href='{HtmlEncoder.Default.Encode(callbackUrl)}'>clicking here</a>.");
                    //
                    // if (_userManager.Options.SignIn.RequireConfirmedAccount)
                    // {
                    //     return RedirectToPage("RegisterConfirmation", new { email = Input.Email, returnUrl = returnUrl });
                    // }
                    // else
                    // {
                    //     await _signInManager.SignInAsync(user, isPersistent: false);
                    //     return LocalRedirect(returnUrl);
                    // }
                    
                    return Redirect("/");
                }
                foreach (var error in result.Errors)
                {
                    ModelState.AddModelError(string.Empty, error.Description);
                }
                
            }

            // If we got this far, something failed, redisplay form
            return View();
        }
    }
}