using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using IEweb.Models;

namespace IEweb.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExpansesController : ControllerBase
    {
        private readonly IEDBContext _context;

        public ExpansesController(IEDBContext context)
        {
            _context = context;
        }

        // GET: api/Expanses
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Expanses>>> GetExpanses()
        {
            return await _context.Expanses.ToListAsync();
        }

        // GET: api/Expanses/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Expanses>> GetExpanses(int id)
        {
            var expanses = await _context.Expanses.FindAsync(id);

            if (expanses == null)
            {
                return NotFound();
            }

            return expanses;
        }

        // PUT: api/Expanses/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutExpanses(int id, Expanses expanses)
        {
            if (id != expanses.Id)
            {
                return BadRequest();
            }

            _context.Entry(expanses).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ExpansesExists(id))
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

        // POST: api/Expanses
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<Expanses>> PostExpanses(Expanses expanses)
        {
            _context.Expanses.Add(expanses);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetExpanses", new { id = expanses.Id }, expanses);
        }

        // DELETE: api/Expanses/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Expanses>> DeleteExpanses(int id)
        {
            var expanses = await _context.Expanses.FindAsync(id);
            if (expanses == null)
            {
                return NotFound();
            }

            _context.Expanses.Remove(expanses);
            await _context.SaveChangesAsync();

            return expanses;
        }

        private bool ExpansesExists(int id)
        {
            return _context.Expanses.Any(e => e.Id == id);
        }
    }
}
