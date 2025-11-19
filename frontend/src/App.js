import React from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import LoginLanding from "./pages/LoginLanding";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import StoreDetail from "./pages/StoreDetail";
import AdminDashboard from "./pages/AdminDashboard";
import AdminUsers from "./pages/AdminUsers";
import AdminStores from "./pages/AdminStores";
import OwnerDashboard from "./pages/OwnerDashboard";
import UserDashboard from "./pages/UserDashboard";
import ProtectedRoute from "./components/ProtectedRoute";

function Nav() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
    window.location.reload();
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light mb-3">
      <div className="container">
        <Link className="navbar-brand" to="/">StoreRate</Link>
        <div>
          <ul className="navbar-nav ms-auto d-flex align-items-center">
            <li className="nav-item me-2"><Link className="nav-link" to="/">Stores</Link></li>
            {!user && <>
              <li className="nav-item me-2"><Link className="btn btn-outline-primary" to="/login">Login</Link></li>
              <li className="nav-item"><Link className="btn btn-success" to="/register">Signup</Link></li>
            </>}
            {user && <>
              <li className="nav-item me-2"><span className="nav-link">Hi, {user.name}</span></li>
              {user.role === "admin" && <li className="nav-item me-2"><Link className="btn btn-outline-secondary" to="/admin">Admin</Link></li>}
              {user.role === "owner" && <li className="nav-item me-2"><Link className="btn btn-outline-secondary" to="/owner">Owner</Link></li>}
              <li className="nav-item"><button className="btn btn-danger" onClick={logout}>Logout</button></li>
            </>}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default function App(){
  return (
    <>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<ProtectedRoute roles={['user', 'owner', 'admin']}><Home /></ProtectedRoute>}/>
          <Route path="/store/:id" element={<StoreDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/login-landing" element={<LoginLanding />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin" element={<ProtectedRoute roles={['admin']}><AdminDashboard/></ProtectedRoute>} />
          <Route path="/admin/users" element={<ProtectedRoute roles={['admin']}><AdminUsers/></ProtectedRoute>} />
          <Route path="/admin/stores" element={<ProtectedRoute roles={['admin']}><AdminStores/></ProtectedRoute>} />
          <Route path="/owner" element={<ProtectedRoute roles={['owner']}><OwnerDashboard/></ProtectedRoute>} />
          <Route path="/user" element={<ProtectedRoute roles={['user']}><UserDashboard/></ProtectedRoute>} />
        </Routes>
      </div>
    </>
  );
}
