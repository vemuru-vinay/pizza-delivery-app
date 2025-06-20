import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import CustomPizzaBuilder from './pages/CustomPizzaBuilder';
import AdminPanel from './pages/AdminPanel';
import AdminOrders from './pages/AdminOrders';
import Navbar from './components/Navbar';


function App() {
  // ✅ Safely get user inside the function
  let user = null;
  try {
    const raw = localStorage.getItem("userInfo") || "null";
    user = JSON.parse(raw);
  } catch (e) {
    console.error("❌ Invalid JSON in localStorage for userInfo");
    user = null;
  }

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* 🔒 Protected Route - only for logged-in users */}
        <Route
          path="/custom"
          element={
            user ? <CustomPizzaBuilder /> : <Navigate to="/login" />
          }
        />

        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/admin-orders" element={<AdminOrders />} />
      </Routes>
    </Router>
  );
}

export default App;
