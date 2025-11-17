import React, { useState } from "react";
import API, { setAuthToken } from "../api/api";
import { useNavigate } from "react-router-dom";
import "../styles/components/StoreCard.css";

export default function Login({ setUser }) {
  const [form, setForm] = useState({ email:"", password:"" });
  const [error, setError] = useState("");
  const nav = useNavigate();
  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", form);
      const { token, user } = res.data;
      localStorage.setItem("token", token);
      setAuthToken(token);
      setUser(user);
      nav("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };
  return (
    <div className="auth-container">
      <h2 className="mb-3">Login</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={submit}>
        <div className="mb-2"><input className="form-control" placeholder="Email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} /></div>
        <div className="mb-2"><input type="password" className="form-control" placeholder="Password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} /></div>
        <button className="btn btn-primary w-100">Login</button>
      </form>
    </div>
  );
}
