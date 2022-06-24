import React from "react";
import { Navigate } from "react-router-dom";


const ProtectedRoute = ({ children }) => {
  const user = localStorage.getItem("token");
  if (!user) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default ProtectedRoute;
