import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // ⬅ Make sure this is imported
import './Form.css';
import { Link } from "react-router-dom";


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // ⬅ React Router navigation

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("userInfo", JSON.stringify(data));
        alert("✅ Login Successful");

        // 🔥 Redirect based on isAdmin flag
        if (data.isAdmin) {
          navigate("/admin-orders");
        } else {
          navigate("/");
        }
      } else {
        alert("❌ Invalid email or password");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("❌ Server error during login");
    }
  };

  return (
    <div className="form-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      <p style={{ marginTop: '10px' }}>
  New here? <Link to="/register">Register instead</Link>
</p>
    </div>
  );
};

export default Login;
