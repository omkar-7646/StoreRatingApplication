import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import API, { setAuthToken } from "./api/api";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import StoreList from "./pages/StoreList";
import StoreDetail from "./pages/StoreDetail";
import AdminDashboard from "./pages/AdminDashboard";
import OwnerDashboard from "./pages/OwnerDashboard";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminCreateStore from "./pages/AdminCreateStore";
import AdminLogin from "./pages/AdminLogin";
import OwnerAddStore from "./pages/OwnerAddStore";
import OwnerChangePassword from "./pages/OwnerChangePassword";
import OwnerLogin from "./pages/OwnerLogin";

function App() {

  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);

 

  useEffect(() => {

    const token = localStorage.getItem("token");

 

    if (token) {

      setAuthToken(token);

      API.get("/users/me")

        .then(res => setUser(res.data))

        .catch(() => localStorage.removeItem("token"))

        .finally(() => setLoading(false));

    } else {

      setLoading(false);

    }

  }, []);

 

  if (loading) return <div>Loading...</div>;







  return (
    <BrowserRouter>
      <Navbar user={user} setUser={setUser} />
      <div className="page-container mt-4">
        <Routes>
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/" element={<StoreList user={user} />} />          
          <Route path="/register" element={<Register />} />
          <Route path="/stores/:id" element={<StoreDetail user={user} />} />
          <Route path="/profile" element={<ProtectedRoute user={user}><Profile user={user} setUser={setUser} /></ProtectedRoute>} />
<Route  path="/admin"  element={

    <ProtectedRoute user={user} loading={loading} roles={["admin"]}>

      <AdminDashboard />

    </ProtectedRoute>

  }

/>          <Route path="/admin/login"  element={<AdminLogin setUser={setUser} />} />
          <Route path="/admin/stores/create"element={<ProtectedRoute user={user} roles={["admin"]}><AdminCreateStore /></ProtectedRoute>}/>
          <Route path="/owner" element={<ProtectedRoute user={user} roles={["owner"]}><OwnerDashboard user={user} /></ProtectedRoute>} />
          <Route path="/owner/login" element={<OwnerLogin setUser={setUser} />} />
          <Route path="/owner/add-store" element={<ProtectedRoute user={user} roles={["owner"]}><OwnerAddStore /></ProtectedRoute>}/>
          <Route path="/owner/change-password" element={<ProtectedRoute user={user} roles={["owner"]}><OwnerChangePassword /></ProtectedRoute>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
