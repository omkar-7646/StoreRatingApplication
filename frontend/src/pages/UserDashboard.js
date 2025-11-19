import React from "react";
import { Link } from "react-router-dom";

export default function UserDashboard(){
  return (
    <div>
      <h3>User Dashboard</h3>
      <p>Explore stores and submit ratings.</p>
      <Link to="/">View Stores</Link>
    </div>
  );
}
