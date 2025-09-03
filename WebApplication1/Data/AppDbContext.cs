using Microsoft.EntityFrameworkCore;
using WebApplication1.Models;

namespace WebApplication.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }

        public DbSet<TaxRecord> TaxRecords { get; set; }
    }
}
