namespace Wallet_Recharge_System.Models
{
    public class Wallet
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public decimal Balance { get; set; } = 0;
        public User User { get; set; } // Navigation property to the user
    }
}
