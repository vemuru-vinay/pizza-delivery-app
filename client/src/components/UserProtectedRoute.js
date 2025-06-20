import React from 'react';
import { Navigate } from 'react-router-dom';

const UserProtectedRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("userInfo"));

  if (!user) {
    alert("Please login to build your pizza 🍕");
    return <Navigate to="/login" />;
  }

  if (user.isAdmin) {
    alert("Admins cannot build pizza.");
    return <Navigate to="/" />;
  }

  return children;
};

export default UserProtectedRoute;
