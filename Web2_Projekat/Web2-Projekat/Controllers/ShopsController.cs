using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Web2_Projekat.Data;
using Web2_Projekat.Models;

namespace Web2_Projekat.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ShopsController : ControllerBase
    {
        private readonly Web2_ProjekatContext _context;

        public ShopsController(Web2_ProjekatContext context)
        {
            _context = context;
        }

        // GET: api/Shops
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Shop>>> GetShop()
        {
          if (_context.Shop == null)
          {
              return NotFound();
          }
            return await _context.Shop.ToListAsync();
        }

        // GET: api/Shops/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Shop>> GetShop(long id)
        {
          if (_context.Shop == null)
          {
              return NotFound();
          }
            var shop = await _context.Shop.FindAsync(id);

            if (shop == null)
            {
                return NotFound();
            }

            return shop;
        }

        // PUT: api/Shops/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutShop(long id, Shop shop)
        {
            if (id != shop.Id)
            {
                return BadRequest();
            }

            _context.Entry(shop).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ShopExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Shops
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Shop>> PostShop(Shop shop)
        {
          if (_context.Shop == null)
          {
              return Problem("Entity set 'Web2_ProjekatContext.Shop'  is null.");
          }
            _context.Shop.Add(shop);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetShop", new { id = shop.Id }, shop);
        }

        // DELETE: api/Shops/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteShop(long id)
        {
            if (_context.Shop == null)
            {
                return NotFound();
            }
            var shop = await _context.Shop.FindAsync(id);
            if (shop == null)
            {
                return NotFound();
            }

            _context.Shop.Remove(shop);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ShopExists(long id)
        {
            return (_context.Shop?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
