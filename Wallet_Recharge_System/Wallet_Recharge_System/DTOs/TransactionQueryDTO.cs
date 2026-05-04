namespace Wallet_Recharge_System.DTOs
{
    public class TransactionQueryDto
    {
        public DateTime? FromDate { get; set; }
        public DateTime? ToDate { get; set; }

        public decimal? MinAmount { get; set; }
        public decimal? MaxAmount { get; set; }

        public int PageNumber { get; set; } = 1;
        public int PageSize { get; set; } = 10;
    }
}
