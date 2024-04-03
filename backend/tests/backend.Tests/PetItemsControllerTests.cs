using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using src.Models;
using src.Controllers;

namespace backend.Tests.PetItemsControllerTests;

public class PetItemsControllerTests
{
    private readonly PetContext _context;
    private readonly PetItemsController _controller;

    public PetItemsControllerTests()
    {
        var options = new DbContextOptionsBuilder<PetContext>()
            .UseInMemoryDatabase(databaseName: "PetItemsTest")
            .Options;
        _context = new TestDbContext(options);

        _context.Database.EnsureDeleted();
        _context.Database.EnsureCreated();

        _controller = new PetItemsController(_context);
    }

    [Fact]
    public async Task GetPetItem_Returns_All_Items()
    {
        var newItem = new PetItem { Id = Guid.NewGuid(), Name = "Test Pet", Age = 69, Category = PetCategory.dog, FavouriteToy = "yee" };
        _context.PetItem.Add(newItem);
        await _context.SaveChangesAsync();

        var result = await _controller.GetPetItem();

        var actionResult = Assert.IsType<ActionResult<IEnumerable<PetItem>>>(result);
        var returnValue = Assert.IsAssignableFrom<IEnumerable<PetItem>>(actionResult.Value);
        Assert.Single(returnValue);
    }

    [Fact]
    public async Task PostPetItem_Creates_New_Item()
    {
        var newItem = new PetItem { Id = Guid.NewGuid(), Name = "New Pet", Age = 3, FavouriteToy = "yee", Category = PetCategory.dog };

        var result = await _controller.PostPetItem(newItem);

        var actionResult = Assert.IsType<ActionResult<PetItem>>(result);
        var createdAtActionResult = Assert.IsType<CreatedAtActionResult>(actionResult.Result);
        var returnValue = Assert.IsType<PetItem>(createdAtActionResult.Value);
        Assert.Equal(newItem.Name, returnValue.Name);

        var itemInDb = await _context.PetItem.FindAsync(newItem.Id);
        Assert.NotNull(itemInDb);
    }

    [Fact]
    public async Task GetPetItemById_ReturnCorrectPet()
    {
        var testPetId = Guid.NewGuid();
        var testPet = new PetItem { Id = testPetId, Name = "Test pet", Age = 30, Category = PetCategory.cat, FavouriteToy = "yee" };

        _context.PetItem.Add(testPet);
        await _context.SaveChangesAsync();

        var result = await _controller.GetPetItem(testPetId);

        var actionResult = Assert.IsType<ActionResult<PetItem>>(result);
        Assert.True(result.Value is PetItem);
        var petItemResult = result.Value as PetItem;
        Assert.Equal(testPetId, petItemResult.Id);
        Assert.Equal(petItemResult.Age, 30);
        Assert.NotEqual(petItemResult.Age, 100);
        Assert.Equal(petItemResult.Name, "Test pet");

    }

    [Fact]
    public async Task GetPetItemById_ReturnNullOnInvalidId()
    {
        var testPetId = Guid.NewGuid();
        var emptyResult = await _controller.GetPetItem(testPetId);
        Assert.IsType<NotFoundResult>(emptyResult.Result);
    }

    [Fact]
    public async Task DeletePetItem_ActuallyDeletes()
    {
        var testPetId = Guid.NewGuid();
        var testPet = new PetItem { Id = testPetId, Name = "Test pet", Age = 30, Category = PetCategory.cat, FavouriteToy = "ye" };
        _context.PetItem.Add(testPet);
        await _context.SaveChangesAsync();

        var result = await _controller.DeletePetItem(testPetId);
        Assert.IsType<NoContentResult>(result);
        var youShouldBeNull = await _context.PetItem.FindAsync(testPetId);
        Assert.Null(youShouldBeNull);
    }

    [Fact]
    public async Task DeletePetItem_IdNonExistent()
    {
        var testId = Guid.NewGuid();
        var result = await _controller.DeletePetItem(testId);
        Assert.IsType<NotFoundResult>(result);
    }
}
