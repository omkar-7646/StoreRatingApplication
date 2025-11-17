import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ user, children, roles }) {
  if (!user) return <Navigate to="/login" />;
  if (roles && !roles.includes(user.role)) return <Navigate to="/" />;
  return children;
}
