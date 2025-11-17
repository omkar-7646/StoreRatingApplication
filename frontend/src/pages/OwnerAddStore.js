import React, { useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";

export default function OwnerAddStore() {
  const nav = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", address: "" });
  const [msg, setMsg] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/stores", form);
      setMsg("Store added!");
      setTimeout(() => nav("/owner"), 700);
    } catch (err) {
      setMsg("Failed to add store");
    }
  };

  return (
    <div className="container" style={{ maxWidth: 500, marginTop: 40 }}>
      <h2>Add Your Store</h2>

      {msg && <div className="alert alert-info">{msg}</div>}

      <form className="card p-3" onSubmit={submit}>
        <input
          className="form-control mb-3"
          placeholder="Store Name"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          className="form-control mb-3"
          placeholder="Store Email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <textarea
          className="form-control mb-3"
          placeholder="Address"
          onChange={(e) => setForm({ ...form, address: e.target.value })}
        ></textarea>

        <button className="btn btn-primary w-100">Add Store</button>
      </form>
    </div>
  );
}
