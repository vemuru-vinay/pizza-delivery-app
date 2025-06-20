import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const [pizzas, setPizzas] = useState([]);
  const [loading, setLoading] = useState(true);
  let user = null;
try {
  const raw = localStorage.getItem("userInfo") || "null";
  user = JSON.parse(raw);
} catch (err) {
  user = null;
}

  useEffect(() => {
    const fetchPizzas = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/pizzas');
        if (!res.ok) {
          throw new Error('Failed to fetch');
        }
        const data = await res.json();
        setPizzas(Array.isArray(data) ? data : data.pizzas);
      } catch (err) {
        console.error('Error fetching pizzas:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPizzas();
  }, []);

  return (
    <>
      <section className="hero">
        {user?.isAdmin ? (
          <>
            <h1>👨‍💼 Welcome, Admin!</h1>
            <p>Manage pizza orders and track performance.</p>
          </>
        ) : (
          <>
            <h1>Customize Your Pizza, Your Way!</h1>
            <p>Delicious, fresh, and delivered hot to your doorstep.</p>
            <div className="text-center my-8">
              <Link to="/custom">
                <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-xl text-lg shadow-md transition duration-300">
                  🍕 Build Your Own Pizza
                </button>
              </Link>
            </div>
          </>
        )}
      </section>

      <section className="pizza-list">
        <h2>Popular Pizzas</h2>
        <div className="pizzas">
          {loading ? (
            <p>Loading pizzas...</p>
          ) : pizzas.length ? (
            pizzas.map(pizza => (
              <div className="pizza-card" key={pizza._id}>
                <img src={pizza.image} alt={pizza.name} />
                <h3>{pizza.name}</h3>
                <p>{pizza.description}</p>
                {pizza.price && <p><b>₹{pizza.price}</b></p>}
              </div>
            ))
          ) : (
            <p>No pizzas available.</p>
          )}
        </div>
      </section>

      <footer className="footer">© 2025 PizzaHub. All rights reserved.</footer>
    </>
  );
};

export default Home;
