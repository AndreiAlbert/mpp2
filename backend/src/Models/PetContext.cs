using Microsoft.EntityFrameworkCore;

namespace src.Models;

public class PetContext : DbContext
{
    public PetContext(DbContextOptions<PetContext> options)
        : base(options)
    {
    }

    public DbSet<PetItem> PetItem { get; set; } = null!;
}
