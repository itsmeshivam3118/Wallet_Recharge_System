import { useState } from "react";
import api from "../api/axios";

export default function Register() {
  const [form, setForm] = useState({});

  const handleRegister = async () => {
    await api.post("/auth/register", form);
    alert("Registered successfully");
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
      <h2 style={{ marginBottom: "15px" }}>Register</h2>

      <input
        placeholder="Name"
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        style={{
          width: "90%",
          padding: "10px",
          margin: "8px 0",
          borderRadius: "5px",
          border: "1px solid #ccc",
        }}
      />

      <input
        placeholder="Email"
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        style={{
          width: "90%",
          padding: "10px",
          margin: "8px 0",
          borderRadius: "5px",
          border: "1px solid #ccc",
        }}
      />

      <input
        placeholder="Password"
        type="password"
        onChange={(e) => setForm({ ...form, password: e.target.value })}
        style={{
          width: "90%",
          padding: "10px",
          margin: "8px 0",
          borderRadius: "5px",
          border: "1px solid #ccc",
        }}
      />

      <input
        placeholder="Role (Admin/User)"
        onChange={(e) => setForm({ ...form, role: e.target.value })}
        style={{
          width: "90%",
          padding: "10px",
          margin: "8px 0",
          borderRadius: "5px",
          border: "1px solid #ccc",
        }}
      />

      <button
        onClick={handleRegister}
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
        Register
      </button>
    </div>
  );
}
