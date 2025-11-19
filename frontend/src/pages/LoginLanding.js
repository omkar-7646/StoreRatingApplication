import React from "react";
import { Link } from "react-router-dom";

export default function LoginLanding(){
  return (
    <div className="row">
      <div className="col-md-6">
        <div className="brand-cta p-4 mb-3">
          <h2>Add your shop, get discovered</h2>
          <p>Owners grow faster when customers leave honest ratings. Add your shop now and build trust.</p>
          <div className="login-owner-cta mt-3">Owners — claim your store and interact with customers.</div>
        </div>
      </div>
      <div className="col-md-6">
        <div className="card p-4">
          <h4>Choose login type</h4>
          <div className="d-grid gap-2">
            <Link to="/login" className="btn btn-primary">User / Owner / Admin Login</Link>
            <Link to="/register" className="btn btn-success">Register (User or Owner)</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
