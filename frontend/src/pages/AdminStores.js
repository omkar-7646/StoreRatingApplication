import React, { useEffect, useState } from "react";
import API from "../api";

export default function AdminStores() {
  const [stores, setStores] = useState([]);
  const [owners, setOwners] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    ownerId: "",
  });

  async function loadStores() {
    try {
      const res = await API.get("/admin/stores");

      console.log("ADMIN STORES RESPONSE:", res.data);

      // 🔥 Convert ANY shape into array
      const data =
        Array.isArray(res.data)
          ? res.data
          : res.data?.rows
          ? res.data.rows
          : res.data?.data
          ? res.data.data
          : [];

      setStores(data);
    } catch (err) {
      console.error("STORE LOAD ERROR:", err);
      alert("Failed to load stores");
    }
  }

  async function loadOwners() {
    try {
      const res = await API.get("/admin/users");
      const ownerList = res.data.filter((u) => u.role === "owner");
      setOwners(ownerList);
    } catch (err) {
      console.error("OWNER LOAD ERROR:", err);
    }
  }

  useEffect(() => {
    loadStores();
    loadOwners();
  }, []);

  async function submit(e) {
    e.preventDefault();
    try {
      await API.post("/admin/stores", form);
      alert("Store created successfully");

      setForm({
        name: "",
        email: "",
        address: "",
        ownerId: "",
      });

      loadStores();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to create store");
    }
  }

  async function handleDelete(id) {
    if (!window.confirm("Are you sure you want to delete this store?")) return;

    try {
      await API.delete(`/admin/stores/${id}`);
      alert("Store deleted");
      loadStores();
    } catch (err) {
      alert(err.response?.data?.message || "Delete failed");
    }
  }

  return (
    <div>
      <h3 className="mb-3">Manage Stores</h3>

      {/* ---------- CREATE STORE FORM ---------- */}
      <h4>Create Store</h4>
      <form className="border p-3 rounded mb-4" onSubmit={submit}>
        <div className="row">
          <div className="col">
            <input
              className="form-control"
              placeholder="Store Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </div>

          <div className="col">
            <input
              className="form-control"
              placeholder="Store Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>
        </div>

        <div className="row mt-2">
          <div className="col">
            <input
              className="form-control"
              placeholder="Store Address"
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              required
            />
          </div>

          <div className="col">
            <select
              className="form-select"
              value={form.ownerId}
              onChange={(e) => setForm({ ...form, ownerId: e.target.value })}
            >
              <option value="">Choose Owner (optional)</option>
              {owners.map((o) => (
                <option key={o.id} value={o.id}>
                  {o.name} ({o.email})
                </option>
              ))}
            </select>
          </div>
        </div>

        <button className="btn btn-success mt-3">Create Store</button>
      </form>

      {/* ----------- STORE LIST ----------- */}
      <h4>Stores</h4>

      {stores.length === 0 && (
        <div className="text-muted">No stores found</div>
      )}

      {stores.map((s) => (
        <div
          key={s.id}
          className="border p-3 rounded mb-2 d-flex justify-content-between"
        >
          <div>
            <strong>{s.name}</strong>
            <div className="text-muted small">{s.address}</div>

            <div className="small text-info">
              Owner ID: {s.ownerId ?? "None"}
            </div>

            <div className="small text-muted">
              Average Rating: {s.averageRating?.toFixed?.(2) || "0.00"}
            </div>
          </div>

          <button
            className="btn btn-danger btn-sm"
            onClick={() => handleDelete(s.id)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
