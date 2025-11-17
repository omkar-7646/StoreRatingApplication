import React, { useEffect, useState } from "react";
import API from "../api/api";
import { Link } from "react-router-dom";

export default function OwnerDashboard() {
  const [store, setStore] = useState(null);
  const [ratings, setRatings] = useState([]);

  useEffect(() => {
    API.get("/stores/owner").then((res) => setStore(res.data));

    API.get("/ratings/owner").then((res) => setRatings(res.data));
  }, []);

  if (!store) return <h3 className="text-center">Loading...</h3>;

  return (
    <div className="container mt-4">
      <h2>Owner Dashboard</h2>

      <div className="card p-3 shadow-sm mb-4">
        <h4>Your Store</h4>
        <p><strong>Name:</strong> {store.name}</p>
        <p><strong>Address:</strong> {store.address}</p>
        <p><strong>Average Rating:</strong> {store.averageRating}</p>

        <Link to="/owner/add-store" className="btn btn-success mt-3">
          Add Store
        </Link>
      </div>

      <h3>Ratings Received</h3>

      <div className="card p-3 shadow-sm">
        {ratings.length === 0 ? (
          <p>No ratings yet</p>
        ) : (
          ratings.map((r) => (
            <div key={r.id} className="border p-2 mb-2 rounded">
              <strong>User:</strong> {r.user.name} <br />
              <strong>Rating:</strong> {r.rating}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

