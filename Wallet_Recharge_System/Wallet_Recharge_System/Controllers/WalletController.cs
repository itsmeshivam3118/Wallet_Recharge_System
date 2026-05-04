using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using Wallet_Recharge_System.Models;
using Wallet_Recharge_System.Data;
using Wallet_Recharge_System.DTOs;

namespace Wallet_Recharge_System.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WalletController : ControllerBase
    {
        private readonly ApplicationDbContext _Context;
        public WalletController(ApplicationDbContext Context)
        {
            _Context = Context;
        }
        [Authorize]
        [HttpGet("Balance")]
        public async Task<IActionResult> GetBalance()
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
            var wallet = await _Context.Wallets.FirstOrDefaultAsync(u => u.UserId == userId);
            if (wallet == null)
                return NotFound("Wallet not found");
            return Ok(new { balance = wallet.Balance });
        }
        [Authorize(Roles = "admin")]
        [HttpPost("AddMoney")]
        public async Task<IActionResult> AddMoney(AddMoneyDTO addMoneyDTO)
        {
            if (addMoneyDTO.Amount <= 0)
                return BadRequest("Amount must be greater than zero");

            
            var wallet = await _Context.Wallets.FirstOrDefaultAsync(w => w.UserId == addMoneyDTO.UserId);

            if (wallet == null)
                return NotFound("Wallet not found");

            wallet.Balance += addMoneyDTO.Amount;

            // Create transaction
            var transaction = new Transaction
            {
                UserId = addMoneyDTO.UserId,
                Amount = addMoneyDTO.Amount,
                Type = "Credit",
                Status = "Success",
                ReferenceId = Guid.NewGuid().ToString(),
                RechargeType = "Admin Recharge",

            };
            _Context.Transactions.Add(transaction);
            await _Context.SaveChangesAsync();
            return Ok(new { balance = wallet.Balance });

        }
    }
}
