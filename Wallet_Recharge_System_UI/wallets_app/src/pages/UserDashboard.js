import { useEffect, useState } from "react";
import api from "../api/axios";

export default function UserDashboard() {
  const [balance, setBalance] = useState(0);
  const [amount, setAmount] = useState("");

  const [transactions, setTransactions] = useState([]);

  const [filters, setFilters] = useState({
    fromDate: "",
    toDate: "",
    minAmount: "",
    maxAmount: "",
    pageNumber: 1,
    pageSize: 5,
  });

  const [totalRecords, setTotalRecords] = useState(0);

  // 🔹 Fetch Balance
  const fetchBalance = async () => {
    try {
      const res = await api.get("/wallet/balance");
      setBalance(res.data.balance);
    } catch (err) {
      console.error(err);
    }
  };

  // 🔹 Fetch Transactions (with filters)
  const fetchTransactions = async () => {
    try {
      const res = await api.get("/transactions/transactions", {
        params: {
          fromDate: filters.fromDate || null,
          toDate: filters.toDate || null,
          minAmount: filters.minAmount || null,
          maxAmount: filters.maxAmount || null,
          pageNumber: filters.pageNumber,
          pageSize: filters.pageSize,
        },
      });

      setTransactions(res.data.data);
      setTotalRecords(res.data.totalRecords);
    } catch (err) {
      console.error(err);
    }
  };

  // 🔹 Recharge
  const recharge = async (type) => {
    try {
      debugger;
      const res = await api.post("/recharge", {
        amount: Number(amount),
        rechargeType: type,
      });

      alert(res.data);
      setAmount("");
      fetchBalance();
      fetchTransactions();
    } catch (err) {
      const message = err.response?.data?.message || "Something went wrong";
      alert(message);
    }
  };

  useEffect(() => {
    fetchBalance();
    fetchTransactions();
  }, [filters.pageNumber]);

  return (
    <div
      style={{
        maxWidth: "500px",
        margin: "40px auto",
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "10px",
        fontFamily: "Arial",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
      }}
    >
      <h2 style={{ textAlign: "center" }}>User Dashboard</h2>

      {/* 💰 Balance */}
      <h3 style={{ color: "green", textAlign: "center" }}>
        Balance: ₹{balance}
      </h3>

      {/* 📱 Recharge */}
      <input
        placeholder="Recharge Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        style={{
          padding: "10px",
          width: "100%",
          marginBottom: "15px",
          borderRadius: "5px",
          border: "1px solid #ccc",
        }}
      />

      <div style={{ display: "flex", gap: "10px" }}>
        <button
          onClick={() => recharge("Mobile")}
          style={{
            flex: 1,
            padding: "10px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "5px",
          }}
        >
          Mobile Recharge
        </button>

        <button
          onClick={() => recharge("DTH")}
          style={{
            flex: 1,
            padding: "10px",
            backgroundColor: "#28a745",
            color: "white",
            border: "none",
            borderRadius: "5px",
          }}
        >
          DTH Recharge
        </button>
      </div>

      {/* 🔍 Filters */}
      <h3 style={{ marginTop: "25px" }}>Filters</h3>

      <input
        type="date"
        onChange={(e) => setFilters({ ...filters, fromDate: e.target.value })}
        style={{ width: "100%", marginBottom: "10px" }}
      />

      <input
        type="date"
        onChange={(e) => setFilters({ ...filters, toDate: e.target.value })}
        style={{ width: "100%", marginBottom: "10px" }}
      />

      <input
        placeholder="Min Amount"
        onChange={(e) => setFilters({ ...filters, minAmount: e.target.value })}
        style={{ width: "100%", marginBottom: "10px" }}
      />

      <input
        placeholder="Max Amount"
        onChange={(e) => setFilters({ ...filters, maxAmount: e.target.value })}
        style={{ width: "100%", marginBottom: "10px" }}
      />

      <button
        onClick={() => {
          setFilters({ ...filters, pageNumber: 1 });
          fetchTransactions();
        }}
        style={{
          width: "100%",
          padding: "10px",
          backgroundColor: "#333",
          color: "white",
          border: "none",
          borderRadius: "5px",
        }}
      >
        Apply Filters
      </button>

      {/* 📊 Transactions */}
      <h3 style={{ marginTop: "25px" }}>Transaction History</h3>

      {transactions.length === 0 ? (
        <p>No transactions found</p>
      ) : (
        transactions.map((txn) => (
          <div
            key={txn.id}
            style={{
              border: "1px solid #ddd",
              padding: "10px",
              marginBottom: "10px",
              borderRadius: "5px",
              backgroundColor: txn.type === "Credit" ? "#e6ffe6" : "#ffe6e6",
            }}
          >
            <p>
              <strong>Type:</strong> {txn.type}
            </p>
            <p>
              <strong>Amount:</strong> ₹{txn.amount}
            </p>
            <p>
              <strong>Status:</strong> {txn.status}
            </p>
            <p>
              <strong>Recharge:</strong> {txn.rechargeType || "-"}
            </p>
            <p>
              <strong>Date:</strong> {new Date(txn.createdAt).toLocaleString()}
            </p>
          </div>
        ))
      )}

      {/* 🔄 Pagination */}
      <div style={{ textAlign: "center", marginTop: "15px" }}>
        <button
          disabled={filters.pageNumber === 1}
          onClick={() =>
            setFilters({
              ...filters,
              pageNumber: filters.pageNumber - 1,
            })
          }
        >
          Prev
        </button>

        <span style={{ margin: "0 10px" }}>Page {filters.pageNumber}</span>

        <button
          disabled={filters.pageNumber * filters.pageSize >= totalRecords}
          onClick={() =>
            setFilters({
              ...filters,
              pageNumber: filters.pageNumber + 1,
            })
          }
        >
          Next
        </button>
      </div>
    </div>
  );
}
