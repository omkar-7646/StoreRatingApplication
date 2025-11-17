import React, { useState } from "react";
import API, { setAuthToken } from "../api/api.js";
import { useNavigate } from "react-router-dom";

export default function AdminLogin({setUser}) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", form);
      const { user, token } = res.data;
      console.log(res.data)
      if (user.role !== "admin") {
        setError("Access denied. Only admins can login here.");
        return;
      }

      localStorage.setItem("token", token);
      setAuthToken(token);
      setUser(user);
      navigate("/admin");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="container" style={{ maxWidth: "420px", marginTop: "80px" }}>
      <div className="card p-4 shadow">
        <h2 className="text-center mb-3">Admin Login</h2>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={submit}>
          <input
            className="form-control mb-3"
            placeholder="Admin Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />

          <input
            type="password"
            className="form-control mb-3"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />

          <button className="btn btn-dark w-100">Login</button>
        </form>
      </div>
    </div>
  );
}
