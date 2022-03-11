using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using IdentityServer4;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using ZanduIdentity.Data;
using ZanduIdentity.Data.Repositories.UserRepo;
using ZanduIdentity.Dtos.UsersDto;
using ZanduIdentity.Models;

namespace ZanduIdentity.Api
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(IdentityServerConstants.LocalApi.PolicyName)]
    public class UsersController : ControllerBase
    {
        private readonly UserRepo _repository;
        private readonly IMapper _mapper;
        private readonly ILogger<UsersController> _logger;

        public UsersController(UserRepo repository, IMapper mapper, ILogger<UsersController> logger)
        {
            _repository = repository;
            _mapper = mapper;
            _logger = logger;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ApplicationUser>>> GetUsersAsync()
        {
            _logger.LogInformation("Get all users");
            
            var users = await _repository.GetAllAsync();
            return Ok(_mapper.Map<IEnumerable<UserReadDto>>(users));
        }
        
        [HttpGet("{id}", Name = "GetUser")]
        public async Task<ActionResult<IEnumerable<ApplicationUser>>> GetUserAsync(string id)
        {
            _logger.LogInformation("Get user by id");
            
            var user = await _repository.GetByIdAsync(id);
            return Ok(_mapper.Map<UserReadDto>(user));
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<IEnumerable<ApplicationUser>>> UpdateUserAsync(string id, UserUpdateDto user)
        {
            if (id != user.Id)
            {
                return BadRequest();
            }

            var storedUser = await _repository.GetByIdAsync(id);

            if (storedUser == null)
            {
                return NotFound();
            }

            _mapper.Map(user, storedUser);

            try
            {
                await _repository.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if ((await _repository.GetByIdAsync(id)) == null)
                {
                    return NotFound();
                }
            }
            
            return NoContent();
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        public async Task<ActionResult<ApplicationUser>> CreateUserAsync(UserCreateDto user)
        {
            if (user == null)
            {
                throw new ArgumentNullException(nameof(user));
            }

            var applicationUser = _mapper.Map<ApplicationUser>(user);
            await _repository.CreateAsync(applicationUser);
            await _repository.SaveChangesAsync();
            return CreatedAtRoute(nameof(GetUserAsync), new {Id = applicationUser.Id}, applicationUser);
        }

        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<ApplicationUser>> DeleteUserAsync(string id)
        {
            var user = await _repository.GetByIdAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            _repository.Delete(user);

            await _repository.SaveChangesAsync();

            return NoContent();
        }
    }
}