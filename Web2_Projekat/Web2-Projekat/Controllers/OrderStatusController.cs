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
    public class OrderStatusController : ControllerBase
    {
        private readonly Web2_ProjekatContext _context;

        public OrderStatusController(Web2_ProjekatContext context)
        {
            _context = context;
        }

        // GET: api/OrderStatus
        [HttpGet]
        public async Task<ActionResult<IEnumerable<OrderStatus>>> GetOrderStatus()
        {
          if (_context.OrderStatus == null)
          {
              return NotFound();
          }
            return await _context.OrderStatus.ToListAsync();
        }

        // GET: api/OrderStatus/5
        [HttpGet("{id}")]
        public async Task<ActionResult<OrderStatus>> GetOrderStatus(long id)
        {
          if (_context.OrderStatus == null)
          {
              return NotFound();
          }
            var orderStatus = await _context.OrderStatus.FindAsync(id);

            if (orderStatus == null)
            {
                return NotFound();
            }

            return orderStatus;
        }

        // PUT: api/OrderStatus/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutOrderStatus(long id, OrderStatus orderStatus)
        {
            if (id != orderStatus.Id)
            {
                return BadRequest();
            }

            _context.Entry(orderStatus).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OrderStatusExists(id))
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

        // POST: api/OrderStatus
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<OrderStatus>> PostOrderStatus(OrderStatus orderStatus)
        {
          if (_context.OrderStatus == null)
          {
              return Problem("Entity set 'Web2_ProjekatContext.OrderStatus'  is null.");
          }
            _context.OrderStatus.Add(orderStatus);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetOrderStatus", new { id = orderStatus.Id }, orderStatus);
        }

        // DELETE: api/OrderStatus/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOrderStatus(long id)
        {
            if (_context.OrderStatus == null)
            {
                return NotFound();
            }
            var orderStatus = await _context.OrderStatus.FindAsync(id);
            if (orderStatus == null)
            {
                return NotFound();
            }

            _context.OrderStatus.Remove(orderStatus);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool OrderStatusExists(long id)
        {
            return (_context.OrderStatus?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
