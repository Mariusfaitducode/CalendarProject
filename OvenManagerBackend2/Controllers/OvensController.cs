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
    public class OvensController : ControllerBase
    {
        private readonly OvenDatabaseContext _context;

        public OvensController(OvenDatabaseContext context)
        {
            _context = context;
        }


        // GET: api/Ovens
        [HttpGet ("OvensWithProperty")]
        public async Task<ActionResult<IEnumerable<Oven>>> GetOvensWithProperties()
        {
            var ovensWithProperties = _context.Ovens
                                              .Include(o => o.Properties)
                                              .ToList();


            return Ok(ovensWithProperties);
        }


        // GET: api/Ovens
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Oven>>> GetOvens()
        {
          if (_context.Ovens == null)
          {
              return NotFound();
          }
            return await _context.Ovens.ToListAsync();
        }

        // GET: api/Ovens/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Oven>> GetOven(int id)
        {
          if (_context.Ovens == null)
          {
              return NotFound();
          }
            var oven = await _context.Ovens.FindAsync(id);

            if (oven == null)
            {
                return NotFound();
            }

            return oven;
        }

        // PUT: api/Ovens/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutOven(int id, Oven oven)
        {
            if (id != oven.Id)
            {
                return BadRequest();
            }

            _context.Entry(oven).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OvenExists(id))
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

        // POST: api/Ovens
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Oven>> PostOven(Oven oven)
        {
          if (_context.Ovens == null)
          {
              return Problem("Entity set 'OvenDatabaseContext.Ovens'  is null.");
          }
            _context.Ovens.Add(oven);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetOven", new { id = oven.Id }, oven);
        }

        // DELETE: api/Ovens/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOven(int id)
        {
            if (_context.Ovens == null)
            {
                return NotFound();
            }
            var oven = await _context.Ovens.FindAsync(id);
            if (oven == null)
            {
                return NotFound();
            }

            _context.Ovens.Remove(oven);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool OvenExists(int id)
        {
            return (_context.Ovens?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
