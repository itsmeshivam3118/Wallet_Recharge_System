namespace Wallet_Recharge_System.Models
{
    public class Transaction
    {
        public int Id { get; set; }

        public int UserId { get; set; }

        public decimal Amount { get; set; }

        public string Type { get; set; } // Credit / Debit

        public string RechargeType { get; set; } // Mobile / DTH

        public string ReferenceId { get; set; }

        public string Status { get; set; } // Success / Failed

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        // Navigation
        public User User { get; set; }
    }
}
