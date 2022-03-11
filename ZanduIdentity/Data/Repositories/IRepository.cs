using System.Collections.Generic;
using System.Threading.Tasks;

namespace ZanduIdentity.Data.Repositories
{
    public interface IRepository<T, in TId>
    {
        Task<IEnumerable<T>> GetAllAsync();
        Task<T> GetByIdAsync(TId id);
        Task CreateAsync(T e);
        void Update(T user);
        void Delete(T t);
        Task<bool> SaveChangesAsync();
    }
}