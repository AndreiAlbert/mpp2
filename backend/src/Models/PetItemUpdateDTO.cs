using System.ComponentModel.DataAnnotations;
namespace src.Models;

public class PetItemUpdateDTO
{

    [StringLength(50, MinimumLength = 3)]
    public string? Name { get; set; }

    [StringLength(50)]
    public string? FavouriteToy { get; set; }
}
