import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./../styles/components/Navbar.css";

export default function Navbar({ user, setUser }) {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link to="/" className="navbar-brand">
          <img src="/favicon.svg" alt="logo" style={{ height: 28, marginRight: 8 }} /> 
          StoreRate
        </Link>
      </div>

      <div className="nav-right">
        <Link to="/">Home</Link>

        {user ? (
          <>
            <Link to="/profile">Profile</Link>

            {user.role === "admin" && (
              <Link to="/admin">Admin Dashboard</Link>
            )}

            {user.role === "owner" && (
              <Link to="/owner">Owner Dashboard</Link>
            )}

            <button className="btn btn-sm text-white btn-danger" onClick={logout}>
              Logout
            </button>
          </>
        ) : (
          <>
            {/* User not logged in (Show Login Options) */}
            <Link to="/login">User Login</Link>
            <Link to="/register" className="btn btn-sm text-white btn-primary" style={{ marginLeft: 10 }}>
              Sign up
            </Link>

            {/*  Add Admin Login */}
            <Link 
              to="/admin/login" 
              className="btn text-white btn-sm btn-dark" 
              style={{ marginLeft: 10 }}
            >
              Admin Login
            </Link>

            {/*  Add Store Owner Login */}
            <Link 
              to="/owner/login" 
              className="btn btn-sm text-white btn-secondary" 
              style={{ marginLeft: 10 }}
            >
              Owner Login
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
