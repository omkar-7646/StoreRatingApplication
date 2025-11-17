import React, { useState, useEffect } from "react";
import API from "../api/api.js";
import { useNavigate } from "react-router-dom";
import "../styles/pages/adminStore.css";

export default function AdminCreateStore() {
  const navigate = useNavigate();

  const [owners, setOwners] = useState([]);
  const [message, setMessage] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    ownerId: "",
  });

  // Load only users with role "owner"
  useEffect(() => {
    API.get("/admin/users", { params: { role: "owner" } })
      .then((res) => {
        setOwners(res.data.rows || res.data);
      })
      .catch(() => {
        setMessage("Failed to load owners.");
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/stores", form);
      setMessage("Store added successfully!");
      setTimeout(() => navigate("/admin/stores"), 800);
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to create store");
    }
  };

  return (
    <div className="container" style={{ maxWidth: "600px" }}>
      <h2 className="mb-4">Add New Store</h2>

      {message && <div className="alert alert-info">{message}</div>}

      <form onSubmit={handleSubmit} className="card p-4 shadow-sm">

        <label className="form-label">Store Name</label>
        <input
          className="form-control mb-3"
          placeholder="Enter Store Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />

        <label className="form-label">Store Email</label>
        <input
          className="form-control mb-3"
          placeholder="Enter Store Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <label className="form-label">Store Address</label>
        <textarea
          className="form-control mb-3"
          placeholder="Enter Store Address"
          value={form.address}
          onChange={(e) => setForm({ ...form, address: e.target.value })}
        ></textarea>

        <label className="form-label">Assign Store Owner</label>
        <select
          className="form-select mb-4"
          value={form.ownerId}
          onChange={(e) => setForm({ ...form, ownerId: e.target.value })}
          required
        >
          <option value="">Select an Owner</option>

          {owners.length === 0 && <option disabled>No owners found</option>}

          {owners.map((owner) => (
            <option key={owner.id} value={owner.id}>
              {owner.name} ({owner.email})
            </option>
          ))}
        </select>

        <button className="btn btn-primary w-100">Add Store</button>
      </form>
    </div>
  );
}
