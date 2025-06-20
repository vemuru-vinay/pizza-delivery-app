import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();

  // ✅ Safely parse user from localStorage
  let user = null;
  try {
    const raw = localStorage.getItem("userInfo") || "null";
    user = JSON.parse(raw);
  } catch (e) {
    console.error("❌ Invalid JSON in userInfo");
    user = null;
  }

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    alert("👋 Logged out successfully");
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo" onClick={() => navigate("/")}>
        🍕 PizzaStack
      </div>

      <ul className="navbar-links">
        {!user && (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
          </>
        )}

        {user && !user.isAdmin && (
          <>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/custom">Build Pizza</Link></li>
            <li><button onClick={handleLogout} className="logout-button">Logout</button></li>
          </>
        )}

        {user && user.isAdmin && (
          <>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/admin-orders">Admin Orders</Link></li>
            <li><button onClick={handleLogout} className="logout-button">Logout</button></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
