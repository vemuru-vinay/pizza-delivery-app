// client/src/pages/AdminPanel.js
import React, { useEffect, useState } from 'react';

const AdminPanel = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/custom-pizza/all-orders")
      .then(res => res.json())
      .then(data => setOrders(data))
      .catch(err => console.error("❌ Error fetching orders:", err));
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>📋 Admin Panel - All Custom Pizza Orders</h1>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>#</th>
              <th>Customer</th>
              <th>Email</th>
              <th>Base</th>
              <th>Sauce</th>
              <th>Cheese</th>
              <th>Veggies</th>
              <th>Payment ID</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o, index) => (
              <tr key={o._id}>
                <td>{index + 1}</td>
                <td>{o.customerName}</td>
                <td>{o.email}</td>
                <td>{o.base}</td>
                <td>{o.sauce}</td>
                <td>{o.cheese}</td>
                <td>{o.veggies.join(", ")}</td>
                <td>{o.paymentId}</td>
                <td>{new Date(o.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminPanel;
