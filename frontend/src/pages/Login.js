import React, { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();
  const [error, setError] = useState("");

  async function submit(e) {
    e.preventDefault();
    try {
      const { data } = await API.post("/auth/login", { email, password });

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      if (data.user.role === "admin") nav("/admin");
      else if (data.user.role === "owner") nav("/owner");
      else nav("/");

      window.location.reload();
    } catch (err) {
      setError("Invalid credentials");
    }
  }

  return (
    <div className="container" style={{ maxWidth: 450, marginTop: 80 }}>
      <div className="card p-4 shadow">
        <h2 className="text-center mb-3">Welcome Back!</h2>

        <p className="text-muted text-center" style={{ fontSize: "14px" }}>
          ⭐ To explore stores, submit ratings and enjoy the platform —
          <br />
          <strong>Please login with your account.</strong>
          <br />
          If you are a shop owner, login as Owner.  
          <br />
          If you are system administrator, login as Admin.
        </p>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={submit}>
          <input
            className="form-control mb-3"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            className="form-control mb-3"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button className="btn btn-primary w-100">Login</button>
        </form>
      </div>
    </div>
  );
}
