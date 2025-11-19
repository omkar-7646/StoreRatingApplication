import React, { useEffect, useState } from "react";
import API from "../api";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [q, setQ] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    password: "",
    role: "user",
  });

  // Load users
  async function load() {
    try {
      const res = await API.get("/admin/users", { params: { q } });
      setUsers(res.data);
    } catch (err) {
      console.error("LOAD USERS ERROR:", err);
      alert("Failed to load users");
    }
  }

  useEffect(() => {
    load();
  }, [q]);

  // Create new user
  async function submit(e) {
    e.preventDefault();
    try {
      await API.post("/admin/users", form);
      alert("User created");

      setForm({
        name: "",
        email: "",
        address: "",
        password: "",
        role: "user",
      });

      load();
    } catch (err) {
      alert(err.response?.data?.message || "Error creating user");
    }
  }

  // Delete user
  async function handleDelete(id) {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      await API.delete(`/admin/users/${id}`);
      alert("User deleted successfully");
      load();
    } catch (err) {
      alert(err.response?.data?.message || "Delete failed");
    }
  }

  return (
    <div>
      <h3 className="mb-3">Manage Users</h3>

      {/* Search */}
      <div className="mb-3">
        <input
          className="form-control"
          placeholder="Search by name, email, role..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
      </div>

      {/* CREATE USER FORM */}
      <h4>Create User</h4>
      <form className="border p-3 rounded mb-4" onSubmit={submit}>
        <div className="row">
          <div className="col">
            <input
              className="form-control"
              placeholder="Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </div>

          <div className="col">
            <input
              className="form-control"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>
        </div>

        <div className="row mt-2">
          <div className="col">
            <input
              className="form-control"
              placeholder="Address"
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
            />
          </div>

          <div className="col">
            <input
              className="form-control"
              placeholder="Password"
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
          </div>

          <div className="col">
            <select
              className="form-select"
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
            >
              <option value="user">User</option>
              <option value="owner">Owner</option>
              <option value="admin">Admin</option>
            </select>
          </div>
        </div>

        <button className="btn btn-success mt-3">Create User</button>
      </form>

      {/* USER LIST */}
      <h4>Users</h4>
      {users.length === 0 && (
        <div className="text-muted">No users found.</div>
      )}

      {users.map((u) => (
        <div
          key={u.id}
          className="border p-3 rounded mb-2 d-flex justify-content-between align-items-center"
        >
          <div>
            <strong>{u.name}</strong>{" "}
            <span className="badge bg-secondary">{u.role}</span>
            <div className="text-muted small">{u.email}</div>
            {u.address && (
              <div className="small text-muted">{u.address}</div>
            )}
          </div>

          <button
            className="btn btn-danger btn-sm"
            onClick={() => handleDelete(u.id)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
