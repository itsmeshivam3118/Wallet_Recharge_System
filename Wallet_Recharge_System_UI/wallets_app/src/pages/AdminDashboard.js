import { useState } from "react";
import api from "../api/axios";

export default function AdminDashboard() {
  const [userId, setUserId] = useState("");
  const [amount, setAmount] = useState("");

  const addMoney = async () => {
    try {
      if (!userId || !amount) {
        alert("Please fill all fields");
        return;
      }

      await api.post("/wallet/AddMoney", {
        userId: Number(userId),
        amount: Number(amount),
      });

      alert("Money added");
    } catch (err) {
      alert(err.response?.data || "Failed to add money");
    }
  };

  return (
    <div
      style={{
        maxWidth: "350px",
        margin: "60px auto",
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "10px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        fontFamily: "Arial",
        textAlign: "center",
      }}
    >
      <h2 style={{ marginBottom: "15px" }}>Admin Dashboard</h2>

      <input
        placeholder="UserId"
        onChange={(e) => setUserId(e.target.value)}
        style={{
          width: "90%",
          padding: "10px",
          margin: "10px 0",
          borderRadius: "5px",
          border: "1px solid #ccc",
        }}
      />

      <input
        placeholder="Amount"
        onChange={(e) => setAmount(e.target.value)}
        style={{
          width: "90%",
          padding: "10px",
          margin: "10px 0",
          borderRadius: "5px",
          border: "1px solid #ccc",
        }}
      />

      <button
        onClick={addMoney}
        style={{
          width: "95%",
          padding: "10px",
          marginTop: "10px",
          backgroundColor: "#28a745",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Add Money
      </button>
    </div>
  );
}
