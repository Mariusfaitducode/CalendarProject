using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OvenManagerBackend2.Model;

namespace OvenManagerBackend2.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PropertyReservationsController : ControllerBase
    {
        private readonly OvenDatabaseContext _context;

        public PropertyReservationsController(OvenDatabaseContext context)
        {
            _context = context;
        }

        // GET: api/PropertyReservations
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PropertyReservation>>> GetPropertyReservations()
        {
          if (_context.PropertyReservations == null)
          {
              return NotFound();
          }
            return await _context.PropertyReservations.ToListAsync();
        }

        // GET: api/PropertyReservations/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PropertyReservation>> GetPropertyReservation(int id)
        {
          if (_context.PropertyReservations == null)
          {
              return NotFound();
          }
            var propertyReservation = await _context.PropertyReservations.FindAsync(id);

            if (propertyReservation == null)
            {
                return NotFound();
            }

            return propertyReservation;
        }

        // PUT: api/PropertyReservations/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPropertyReservation(int id, PropertyReservation propertyReservation)
        {
            if (id != propertyReservation.Id)
            {
                return BadRequest();
            }

            _context.Entry(propertyReservation).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PropertyReservationExists(id))
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

        // POST: api/PropertyReservations
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<PropertyReservation>> PostPropertyReservation(PropertyReservation propertyReservation)
        {
          if (_context.PropertyReservations == null)
          {
              return Problem("Entity set 'OvenDatabaseContext.PropertyReservations'  is null.");
          }
            _context.PropertyReservations.Add(propertyReservation);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPropertyReservation", new { id = propertyReservation.Id }, propertyReservation);
        }

        // DELETE: api/PropertyReservations/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePropertyReservation(int id)
        {
            if (_context.PropertyReservations == null)
            {
                return NotFound();
            }
            var propertyReservation = await _context.PropertyReservations.FindAsync(id);
            if (propertyReservation == null)
            {
                return NotFound();
            }

            _context.PropertyReservations.Remove(propertyReservation);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool PropertyReservationExists(int id)
        {
            return (_context.PropertyReservations?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
