import React, { useEffect, useState } from "react";
import API from "../api";

export default function OwnerDashboard() {
  const [store, setStore] = useState(null);
  const [form, setForm] = useState({ name: "", email: "", address: "" });

  // Load the owner's store
  async function loadStore() {
    try {
      const res = await API.get("/owner/dashboard");
      setStore(res.data.store || null);
    } catch (err) {
      console.error(err);
    }
  }

  // Create store
  async function createStore(e) {
    e.preventDefault();
    try {
      const res = await API.post("/stores", form); // owner is permitted
      alert("Store created successfully!");
      setForm({ name: "", email: "", address: "" });
      loadStore();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to create store");
    }
  }

  useEffect(() => {
    loadStore();
  }, []);

  return (
    <div>
      <h3>Owner Dashboard</h3>

      {/* If no store exists, show create-store form */}
      {!store && (
        <>
          <h4 className="mt-3">Create Your Store</h4>
          <form onSubmit={createStore} className="card p-3 mb-4">
            <input
              className="form-control mb-2"
              placeholder="Store Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
            <input
              className="form-control mb-2"
              placeholder="Store Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            <input
              className="form-control mb-2"
              placeholder="Store Address"
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
            />
            <button className="btn btn-primary w-100">Create Store</button>
          </form>
        </>
      )}

      {/* If store exists, show store details */}
      {store && (
        <>
          <h4>Your Store</h4>
          <div className="card p-3 mb-3">
            <h5>{store.name}</h5>
            <p className="text-muted">{store.address}</p>
            <p><strong>Average Rating:</strong> {store.averageRating?.toFixed(2) || 0}</p>
          </div>

          <h4>Ratings Received</h4>

          {store.Ratings?.length === 0 && (
            <div className="alert alert-info">No ratings yet</div>
          )}

          {store.Ratings?.map((r) => (
            <div key={r.id} className="card p-2 mb-2">
              <strong>{r.User?.name}</strong> — {r.rating} stars
              <div>{r.comment}</div>
            </div>
          ))}
        </>
      )}
      {/* Helpful footer note */}
      <div className="mt-4 text-center text-muted" style={{ fontSize: "14px" }}>
        <hr />
        <p>
          <strong>Tip:</strong> You can always click the 
          <span className="text-primary"> Owner </span> button on the top navigation bar
          to add or manage your store anytime.
        </p>
      </div>
    </div>
  );
}
