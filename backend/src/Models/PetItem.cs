using System.ComponentModel.DataAnnotations;
namespace src.Models;

public enum PetCategory
{
    cat,
    dog
}

public class PetItem
{
    public Guid Id { get; set; }

    [StringLength(50, MinimumLength = 3)]
    [Required]
    public string? Name { get; set; }

    [Required]
    [Range(0, 50)]
    public int Age { get; set; }

    [Required]
    [StringLength(50)]
    public string? FavouriteToy { get; set; }

    [Required]
    [EnumDataType(typeof(PetCategory))]
    public PetCategory Category { get; set; }

}
