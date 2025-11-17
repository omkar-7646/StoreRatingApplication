import React from "react";

import { Navigate } from "react-router-dom";

 

export default function ProtectedRoute({ user, loading, children, roles }) {

  if (loading) return <div>Loading...</div>;

 

 

  if (!user) return <Navigate to="/login" replace />;

 

 

  if (roles && !roles.includes(user.role)) {

    return <Navigate to="/" replace />;

  }

 

  return children;

}