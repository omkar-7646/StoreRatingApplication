import React, { useEffect, useState } from "react";
import API from "../api/api.js";

export default function AdminDashboard(){
  const [stats, setStats] = useState({});
  const [users, setUsers] = useState([]);

  useEffect(()=>{
    API.get("/admin/stats").then(res=>setStats(res.data));
    API.get("/admin/users").then(res=>setUsers(res.data.rows || res.data));
  },[]);

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>
      <div className="admin-stats d-flex mb-3">
        <div className="stat-box me-3"><div>Total Users</div><div className="h4">{stats.totalUsers}</div></div>
        <div className="stat-box me-3"><div>Total Stores</div><div className="h4">{stats.totalStores}</div></div>
        <div className="stat-box"><div>Total Ratings</div><div className="h4">{stats.totalRatings}</div></div>
      </div>
      <h4>Users</h4>
      <div className="admin-users-list">
        {users.map(u => <div key={u.id} className="p-2 border-bottom">{u.name} — {u.email} — <em>{u.role}</em></div>)}
      </div>
    </div>
  );
}
