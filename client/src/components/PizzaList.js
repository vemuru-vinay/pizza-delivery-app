import React, { useEffect, useState } from "react";
import axios from "axios";

const PizzaList = () => {
  const [pizzas, setPizzas] = useState([]);

  useEffect(() => {
    const fetchPizzas = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/pizza"); // Or use ngrok link
        setPizzas(res.data);
      } catch (error) {
        console.error("Error fetching pizzas:", error);
      }
    };

    fetchPizzas();
  }, []);

  return (
    <div>
      <h2>Available Pizzas</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {pizzas.map((pizza) => (
          <div key={pizza._id} style={{ border: "1px solid #ccc", padding: "10px", width: "200px" }}>
            <h3>{pizza.name}</h3>
            <p>₹{pizza.price}</p>
            <img src={pizza.image} alt={pizza.name} style={{ width: "100%" }} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PizzaList;
