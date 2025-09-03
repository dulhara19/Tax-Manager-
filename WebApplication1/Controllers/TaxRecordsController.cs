using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplication.Data;
using WebApplication1.Models;
using WebApplication1.Data;
using WebApplication1.Models;

namespace WebApplication1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TaxRecordsController : ControllerBase 

    {
        private readonly AppDbContext _context;

        public TaxRecordsController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/taxrecords
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TaxRecord>>> GetTaxRecords()
        {
            return await _context.TaxRecords.ToListAsync();
        }

        // GET: api/taxrecords/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<TaxRecord>> GetTaxRecord(int id)
        {
            var taxRecord = await _context.TaxRecords.FindAsync(id);

            if (taxRecord == null)
                return NotFound();

            return taxRecord;
        }

        // POST: api/taxrecords
        [HttpPost]
        public async Task<ActionResult<TaxRecord>> CreateTaxRecord(TaxRecord taxRecord)
        {
            _context.TaxRecords.Add(taxRecord);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetTaxRecord), new { id = taxRecord.Id }, taxRecord);
        }

        // PUT: api/taxrecords/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTaxRecord(int id, TaxRecord taxRecord)
        {
            if (id != taxRecord.Id)
                return BadRequest();

            _context.Entry(taxRecord).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TaxRecordExists(id))
                    return NotFound();
                else
                    throw;
            }

            return NoContent();
        }

        // DELETE: api/taxrecords/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTaxRecord(int id)
        {
            var taxRecord = await _context.TaxRecords.FindAsync(id);
            if (taxRecord == null)
                return NotFound();

            _context.TaxRecords.Remove(taxRecord);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TaxRecordExists(int id)
        {
            return _context.TaxRecords.Any(e => e.Id == id);
        }
    }
}
