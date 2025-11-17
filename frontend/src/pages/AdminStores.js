import React, { useEffect, useState } from "react";
import API from "../api/api.js";
import { Link } from "react-router-dom";

export default function AdminStores() {
  const [stores, setStores] = useState([]);
  const [filters, setFilters] = useState({ q: "" });

  const loadStores = () => {
    API.get("/admin/stores", { params: filters })
      .then((res) => {
        // Backend returns either { count, rows } OR simple array
        setStores(res.data.rows || res.data);
      })
      .catch((err) => {
        console.error("Error loading stores:", err);
      });
  };

  useEffect(() => {
    loadStores();
  }, [filters]);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Store Management</h2>

      {/* Filters and Create Button */}
      <div className="row mb-3">
        {/* Search filter */}
        <div className="col-md-6 mb-2">
          <input
            className="form-control"
            placeholder="Search store by name, email or address"
            onChange={(e) => setFilters({ ...filters, q: e.target.value })}
          />
        </div>

        {/* Add Store Button */}
        <div className="col-md-6 mb-2">
          <Link to="/admin/stores/create" className="btn btn-primary w-100">
            ➕ Add New Store
          </Link>
        </div>
      </div>

      {/* Store List Table */}
      <div className="card shadow-sm">
        <div className="card-body p-0">
          <table className="table table-striped mb-0">
            <thead className="table-dark">
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Address</th>
                <th>Avg Rating</th>
              </tr>
            </thead>

            <tbody>
              {stores.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center p-3">
                    No stores found
                  </td>
                </tr>
              ) : (
                stores.map((store) => (
                  <tr key={store.id}>
                    <td>{store.name}</td>
                    <td>{store.email}</td>
                    <td>{store.address}</td>
                    <td>{store.averageRating ?? "—"}</td>
                  </tr>
                ))
              )}
            </tbody>

          </table>
        </div>
      </div>
    </div>
  );
}
