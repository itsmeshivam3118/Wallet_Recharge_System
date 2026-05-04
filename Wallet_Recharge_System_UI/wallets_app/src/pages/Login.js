import { useState } from "react";
import api from "../api/axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    debugger;
    try {
      const res = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      alert("Login success");
    } catch (err) {
      const message = err.response?.data || "Something went wrong";
      alert(message);
    }
  };

  return (
    <div
      style={{
        maxWidth: "350px",
        margin: "80px auto",
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "10px",
        fontFamily: "Arial",
        textAlign: "center",
      }}
    >
      <h2 style={{ marginBottom: "15px" }}>Login</h2>

      <input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        style={{
          width: "90%",
          padding: "10px",
          margin: "10px 0",
          borderRadius: "5px",
          border: "1px solid #ccc",
        }}
      />

      <input
        placeholder="Password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        style={{
          width: "90%",
          padding: "10px",
          margin: "10px 0",
          borderRadius: "5px",
          border: "1px solid #ccc",
        }}
      />

      <button
        onClick={handleLogin}
        style={{
          width: "95%",
          padding: "10px",
          marginTop: "10px",
          backgroundColor: "#007bff",
          color: "white",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Login
      </button>
    </div>
  );
}
