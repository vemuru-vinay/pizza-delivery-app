// src/components/PizzaCard.js
import React from 'react';

function PizzaCard({ image, name, price }) {
  return (
    <div className="pizza-card" style={{ border: '1px solid #ccc', padding: '10px', margin: '10px' }}>
      <img src={image} alt={name} width="150" />
      <h3>{name}</h3>
      <p>Price: ₹{price}</p>
      <button>Order Now</button>
    </div>
  );
}

export default PizzaCard;
