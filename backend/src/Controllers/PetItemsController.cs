using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using src.Models;

namespace src.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PetItemsController : ControllerBase
    {
        private readonly PetContext _context;

        public PetItemsController(PetContext context)
        {
            _context = context;
        }

        // GET: api/PetItems
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PetItem>>> GetPetItem()
        {
            return await _context.PetItem.ToListAsync();
        }

        // GET: api/PetItems/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PetItem>> GetPetItem(Guid id)
        {
            var petItem = await _context.PetItem.FindAsync(id);

            if (petItem == null)
            {
                return NotFound();
            }

            return petItem;
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdatePetItem(Guid id, [FromBody] PetItemUpdateDTO petItemUpdateDTO)
        {
            var petItem = await _context.PetItem.FindAsync(id);
            if (petItem == null)
            {
                return NotFound();
            }

            if (petItemUpdateDTO.Name != null)
                petItem.Name = petItemUpdateDTO.Name;


            if (petItemUpdateDTO.FavouriteToy != null)
                petItem.FavouriteToy = petItemUpdateDTO.FavouriteToy;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PetItemExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetPetItem", new { id = petItem.Id }, petItem);
        }

        [HttpPost]
        public async Task<ActionResult<PetItem>> PostPetItem(PetItem petItem)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            _context.PetItem.Add(petItem);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPetItem", new { id = petItem.Id }, petItem);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePetItem(Guid id)
        {
            var petItem = await _context.PetItem.FindAsync(id);
            if (petItem == null)
            {
                return NotFound();
            }

            _context.PetItem.Remove(petItem);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool PetItemExists(Guid id)
        {
            return _context.PetItem.Any(e => e.Id == id);
        }
    }
}
