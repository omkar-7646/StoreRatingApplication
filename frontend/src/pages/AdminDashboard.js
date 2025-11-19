import React, { useEffect, useState } from "react";
import API from "../api";
import { Link } from "react-router-dom";

export default function AdminDashboard() {
  const [data, setData] = useState({
    totalUsers: 0,
    totalStores: 0,
    totalRatings: 0,
  });

  useEffect(() => {
    API.get("/admin/stats")
      .then((res) => setData(res.data))
      .catch((err) => console.error("STATS ERROR:", err));
  }, []);

  return (
    <div>
      <h3 className="mb-3">Admin Dashboard</h3>

      <div className="row mb-4">
        <div className="col-md-4 mb-2">
          <div className="card p-3 shadow-sm">
            <h5>Total Users</h5>
            <div className="display-6">{data.totalUsers}</div>
          </div>
        </div>

        <div className="col-md-4 mb-2">
          <div className="card p-3 shadow-sm">
            <h5>Total Stores</h5>
            <div className="display-6">{data.totalStores}</div>
          </div>
        </div>

        <div className="col-md-4 mb-2">
          <div className="card p-3 shadow-sm">
            <h5>Total Ratings</h5>
            <div className="display-6">{data.totalRatings}</div>
          </div>
        </div>
      </div>

      <div className="mb-3">
        <Link to="/admin/users" className="btn btn-primary me-2">
          Manage Users
        </Link>

        <Link to="/admin/stores" className="btn btn-secondary">
          Manage Stores
        </Link>
      </div>
    </div>
  );
}
