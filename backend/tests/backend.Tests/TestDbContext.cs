using Microsoft.EntityFrameworkCore;
using src.Models;

namespace backend.Tests.PetItemsControllerTests;

public class TestDbContext : PetContext
{
    public TestDbContext(DbContextOptions<PetContext> options) : base(options)
    {
    }

}
