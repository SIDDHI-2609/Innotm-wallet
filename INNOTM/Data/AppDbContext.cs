using INNOTM.Models;
using Microsoft.EntityFrameworkCore;
using System.Transactions;
using Transaction = INNOTM.Models.Transaction;

namespace INNOTM.Data
{
    public class AppDbContext:DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext>options) : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<Transaction> Transactions { get; set; }
    }
}
