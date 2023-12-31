﻿using System;
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
    public class ReservationsController : ControllerBase
    {
        private readonly OvenDatabaseContext _context;

        public ReservationsController(OvenDatabaseContext context)
        {
            _context = context;
        }


        // GET: api/Reservations
        [HttpGet("ReservationsWithProperty")]
        public async Task<ActionResult<IEnumerable<Reservation>>> GetReservationsWithProperties()
        {
            var ovensWithProperties = _context.Reservations
                                      .Include(o => o.PropertyReservations)
                                      .ToList();

            return Ok(ovensWithProperties);
        }


        // GET: api/Reservations
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Reservation>>> GetReservations()
        {
          if (_context.Reservations == null)
          {
              return NotFound();
          }
            return await _context.Reservations.ToListAsync();
        }

        // GET: api/Reservations/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Reservation>> GetReservation(int id)
        {
          if (_context.Reservations == null)
          {
              return NotFound();
          }
            var reservation = await _context.Reservations.FindAsync(id);

            if (reservation == null)
            {
                return NotFound();
            }

            return reservation;
        }

        // PUT: api/Reservations/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutReservation(int id, Reservation reservation)
        {
            if (id != reservation.Id)
            {
                return BadRequest();
            }

            _context.Entry(reservation).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ReservationExists(id))
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

        // POST: api/Reservations
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Reservation>> PostReservation(Reservation reservation)
        {
          if (_context.Reservations == null)
          {
              return Problem("Entity set 'OvenDatabaseContext.Reservations'  is null.");
          }
            _context.Reservations.Add(reservation);

            foreach (var property in reservation.PropertyReservations)
            {
                // Vérifiez si la propriété existe déjà
                var existingProperty = await _context.PropertyReservations
                                                    .FirstOrDefaultAsync(p => p.Id == property.Id);

                if (existingProperty != null)
                {
                    // Mettre à jour la propriété existante
                    _context.Entry(existingProperty).CurrentValues.SetValues(property);
                }
                else
                {
                    // Ajouter une nouvelle propriété
                    _context.PropertyReservations.Add(property);
                }
            }


            await _context.SaveChangesAsync();

            return CreatedAtAction("GetReservation", new { id = reservation.Id }, reservation);
        }

        // DELETE: api/Reservations/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteReservation(int id)
        {
            if (_context.Reservations == null)
            {
                return NotFound();
            }
            var reservation = await _context.Reservations.FindAsync(id);
            if (reservation == null)
            {
                return NotFound();
            }

            _context.Reservations.Remove(reservation);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ReservationExists(int id)
        {
            return (_context.Reservations?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
