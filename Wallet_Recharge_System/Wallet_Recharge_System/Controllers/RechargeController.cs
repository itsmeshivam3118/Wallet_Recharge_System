using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using Wallet_Recharge_System.Data;
using Wallet_Recharge_System.DTOs;
using Wallet_Recharge_System.Models;

namespace Wallet_Recharge_System.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RechargeController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public RechargeController(ApplicationDbContext context)
        {
            _context = context;
        }

        [Authorize(Roles = "User")]
        [HttpPost]
        public async Task<IActionResult> Recharge(RechargeDto dto)
        {
            if (dto.Amount <= 0)
                return BadRequest(new { message = "Amount must be greater than zero" });

            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

            using var transaction = await _context.Database.BeginTransactionAsync();

            try
            {
                var wallet = await _context.Wallets
                    .FirstOrDefaultAsync(w => w.UserId == userId);

                if (wallet == null)
                {
                    return NotFound(new
                    {
                        message = "Wallet not found"
                    });
                }


                if (wallet.Balance < dto.Amount)
                {
                    return BadRequest(new
                    {
                        message = "Insufficient balance"
                    });
                }
                    

                // Deduct balance
                wallet.Balance -= dto.Amount;

                // Create transaction record
                var txn = new Transaction
                {
                    UserId = userId,
                    Amount = dto.Amount,
                    Type = "Debit",
                    RechargeType = dto.RechargeType,
                    ReferenceId = Guid.NewGuid().ToString(),
                    Status = "Success"
                };

                _context.Transactions.Add(txn);

                await _context.SaveChangesAsync();

                await transaction.CommitAsync();

                return Ok("Recharge successful");
            }
            catch (Exception)
            {
                await transaction.RollbackAsync();
                return StatusCode(500, "Recharge failed");
            }
        }

    }
}
