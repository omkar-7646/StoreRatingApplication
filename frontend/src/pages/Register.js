import React, { useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    role: "user", // default
  });

  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/register", form);
      setMsg("Account created successfully!");
      setTimeout(() => nav("/login"), 1000);
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="container" style={{ maxWidth: "500px", marginTop: "40px" }}>
      <div className="card p-4 shadow">
        <h2 className="mb-3 text-center">Create Account</h2>

        {error && <div className="alert alert-danger">{error}</div>}
        {msg && <div className="alert alert-success">{msg}</div>}

        <form onSubmit={submit}>
          <input
            className="form-control mb-3"
            placeholder="Name"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />

          <input
            className="form-control mb-3"
            placeholder="Email"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />

          <input
            type="password"
            className="form-control mb-3"
            placeholder="Password"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />

          <textarea
            className="form-control mb-3"
            placeholder="Address"
            onChange={(e) => setForm({ ...form, address: e.target.value })}
          ></textarea>

          {/* ⭐ Role Selection */}
          <select
            className="form-control mb-3"
            onChange={(e) => setForm({ ...form, role: e.target.value })}
            value={form.role}
          >
            <option value="user">Normal User</option>
            <option value="owner">Store Owner</option>
          </select>

          <button className="btn btn-primary w-100">Register</button>
        </form>
      </div>
    </div>
  );
}
