using Bogus;
using src.Models;

namespace src.DataGenerators
{
    public static class PetItemGenerator
    {
        public static Faker<PetItem> CreatePetItemFaker()
        {
            var petItemFaker = new Faker<PetItem>()
                .RuleFor(p => p.Id, f => Guid.NewGuid())
                .RuleFor(p => p.Name, f => f.Name.FirstName())
                .RuleFor(p => p.Age, f => f.Random.Int(0, 50))
                .RuleFor(p => p.FavouriteToy, f => f.Commerce.ProductMaterial())
                .RuleFor(p => p.Category, f => f.PickRandom<PetCategory>());

            return petItemFaker;
        }

        public static List<PetItem> GeneratePetItems(int count)
        {
            var faker = CreatePetItemFaker();
            return faker.Generate(count);
        }
    }
}
