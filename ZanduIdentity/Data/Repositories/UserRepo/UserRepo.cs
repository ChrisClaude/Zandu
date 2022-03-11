using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using ZanduIdentity.Models;

namespace ZanduIdentity.Data.Repositories.UserRepo
{
    public class UserRepo : IUserRepo
    {
        private readonly ApplicationDbContext _context;

        public UserRepo(ApplicationDbContext context)
        {
            _context = context;
        }
        
        public async Task<IEnumerable<ApplicationUser>> GetAllAsync()
        {
            return await _context.Users.Take(15).ToListAsync();
        }

        public async Task<ApplicationUser> GetByIdAsync(string id)
        {
            var user = await _context.Users.FindAsync(id);
            return user;
        }

        public async Task CreateAsync(ApplicationUser user)
        {
            await _context.Users.AddAsync(user);
        }

        public void Update(ApplicationUser user)
        {
            _context.Entry(user).State = EntityState.Modified;
        }

        public void Delete(ApplicationUser user)
        {
            if (user == null)
            {
                throw new ArgumentNullException();
            }

            _context.Users.Remove(user);
        }

        public async Task<bool> SaveChangesAsync()
        {
            return await _context.SaveChangesAsync() >= 0;
        }
    }
}