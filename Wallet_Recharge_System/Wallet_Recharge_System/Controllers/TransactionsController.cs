using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using Wallet_Recharge_System.Data;
using Wallet_Recharge_System.DTOs;

namespace Wallet_Recharge_System.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TransactionsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public TransactionsController(ApplicationDbContext context)
        {
            _context = context;
        }
        [Authorize]
        [HttpGet("transactions")]
        public async Task<IActionResult> GetTransactions([FromQuery] TransactionQueryDto query)
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

            var transactions = _context.Transactions
                .Where(t => t.UserId == userId)
                .AsQueryable();

            // Apply Filters
            if (query.FromDate.HasValue)
                transactions = transactions.Where(t => t.CreatedAt >= query.FromDate.Value);

            if (query.ToDate.HasValue)
                transactions = transactions.Where(t => t.CreatedAt <= query.ToDate.Value);

            if (query.MinAmount.HasValue)
                transactions = transactions.Where(t => t.Amount >= query.MinAmount.Value);

            if (query.MaxAmount.HasValue)
                transactions = transactions.Where(t => t.Amount <= query.MaxAmount.Value);

            // Sorting (latest first)
            transactions = transactions.OrderByDescending(t => t.CreatedAt);

            // Pagination
            var totalRecords = await transactions.CountAsync();

            var data = await transactions
                .Skip((query.PageNumber - 1) * query.PageSize)
                .Take(query.PageSize)
                .ToListAsync();

            return Ok(new
            {
                totalRecords,
                pageNumber = query.PageNumber,
                pageSize = query.PageSize,
                data
            });
        }
    }
}
