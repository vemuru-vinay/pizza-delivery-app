import React, { useEffect, useState } from 'react';
import './AdminOrders.css';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]); // default is an array
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));

    if (!user || !user.isAdmin) {
      alert("Access Denied: Not an admin");
      window.location.href = "/";
      return;
    }

    const fetchAdminOrders = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/custom-pizza/admin-orders", {
          headers: {
            'Authorization': `Bearer ${user.token}`
          }
        });

        const data = await res.json();

        if (Array.isArray(data)) {
          setOrders(data);
        } else {
          console.error("❌ Expected array, got:", data);
          setOrders([]);
        }

      } catch (err) {
        console.error("❌ Failed to fetch orders", err);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAdminOrders();
  }, []);

  return (
    <div className="admin-orders-container">
      <h2 className="admin-orders-heading">📋 Admin Dashboard - All Pizza Orders</h2>

      {loading ? (
        <p>Loading...</p>
      ) : orders.length === 0 ? (
        <p className="no-orders">No orders found.</p>
      ) : (
        <div className="orders-grid">
          {orders.map((order, index) => (
            <div key={index} className="order-card">
              <p><strong>Order #{index + 1}</strong></p>
              <p><strong>Base:</strong> {order.base}</p>
              <p><strong>Sauce:</strong> {order.sauce}</p>
              <p><strong>Cheese:</strong> {order.cheese}</p>
              <p><strong>Veggies:</strong> {order.veggies?.join(', ') || "None"}</p>
              <p><strong>Ordered At:</strong> {new Date(order.createdAt).toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminOrders;
