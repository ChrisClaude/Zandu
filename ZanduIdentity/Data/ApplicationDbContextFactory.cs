// <summary>
//   This factory is used by EF migrations.
// </summary>
namespace ZanduIdentity.Data
{
    using Microsoft.EntityFrameworkCore;
    using Microsoft.EntityFrameworkCore.Design;

    /// <summary>
    /// This factory is used by EF migrations.
    /// </summary>
    /// <seealso cref="Microsoft.EntityFrameworkCore.Design.IDesignTimeDbContextFactory{Dariel.IdentityX.AspNETIdentity.Data.ApplicationDbContext}" />
    public class ApplicationDbContextFactory : IDesignTimeDbContextFactory<ApplicationDbContext>
    {
        public ApplicationDbContext CreateDbContext(string[] args)
        {
            var optionsBuilder = new DbContextOptionsBuilder<ApplicationDbContext>();
            optionsBuilder.UseSqlServer("Data Source=.;Initial Catalog=DEV-ZanduIdentity;integrated security=SSPI;MultipleActiveResultSets=True;");
            return new ApplicationDbContext(optionsBuilder.Options);
        }
    }
}
