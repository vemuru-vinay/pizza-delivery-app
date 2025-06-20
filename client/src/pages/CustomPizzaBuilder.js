import React, { useState, useEffect } from 'react';
import './CustomPizzaBuilder.css';

const CustomPizzaBuilder = () => {
  const [step, setStep] = useState(1);
  const [pizza, setPizza] = useState({
    base: "",
    sauce: "",
    cheese: "",
    veggies: [],
  });

  
  // Load Razorpay script once on mount
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);

  
  const handleSelection = (type, value) => {
    if (type === 'veggies') {
      setPizza(prev => ({
        ...prev,
        veggies: prev.veggies.includes(value)
          ? prev.veggies.filter(v => v !== value)
          : [...prev.veggies, value]
      }));
    } else {
      setPizza(prev => ({ ...prev, [type]: value }));
    }
  };

  const handlePlaceOrder = async () => {
  // Save pizza to localStorage
  localStorage.setItem('customPizza', JSON.stringify(pizza));

  try {
    // Step 1: Call backend to create Razorpay order
    const res = await fetch("http://localhost:5000/api/payment/create-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ amount: 299 }) // Fixed price for now
    });

    const data = await res.json();

    // Step 2: Open Razorpay Checkout
    const options = {
      key: "rzp_test_JSGyKDijpHnryO", // Test Key
      amount: data.amount,
      currency: data.currency,
      name: "Pizza Delivery App",
      description: "Custom Pizza Order",
      order_id: data.id,

      handler: async function (response) {
        alert("✅ Payment Successful!\nPayment ID: " + response.razorpay_payment_id);

        // ✅ New Code to save order to MongoDB
        try {
          const user = JSON.parse(localStorage.getItem("userInfo"));

          const res = await fetch("http://localhost:5000/api/custom-pizza/save", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${user?.token}` // send user token for auth
            },
            body: JSON.stringify({
              ...pizza,
              userId: user?._id,
              amount: data.amount / 100,
              paymentId: response.razorpay_payment_id
            })
          });

          const result = await res.json();
          console.log("✅ Order saved to DB:", result);
        } catch (error) {
          console.error("❌ Failed to save to DB:", error);
        }
      },

      prefill: {
        name: "Vinay",
        email: "vinay@example.com",
        contact: "9999999999"
      },
      theme: {
        color: "#F37254"
      }
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  } catch (err) {
    console.error("❌ Payment failed:", err);
    alert("❌ Error during payment. Try again.");
  }
};


  const renderStep = () => {
    const options = {
      1: ["Thin", "Thick", "Stuffed"],
      2: ["Tomato", "Barbecue", "Pesto"],
      3: ["Mozzarella", "Cheddar", "Parmesan"],
      4: ["Capsicum", "Tomato", "Onion", "Corn"]
    };

    const labels = {
      1: "Select Base",
      2: "Select Sauce",
      3: "Select Cheese",
      4: "Select Veggies"
    };

    if (step >= 1 && step <= 4) {
      const type = ["base", "sauce", "cheese", "veggies"][step - 1];
      return (
        <div className="step-box">
          <h2>{labels[step]}</h2>
          <div className="options">
            {options[step].map(item => (
              <button
                key={item}
                onClick={() => handleSelection(type, item)}
                className={`option-button ${
                  type === 'veggies'
                    ? (pizza.veggies.includes(item) ? 'selected' : '')
                    : (pizza[type] === item ? 'selected' : '')
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      );
    }

    // Step 5 - Review & Pay
    return (
      <div className="review-box">
        <h2>Review Your Pizza</h2>
        <p><strong>Base:</strong> {pizza.base}</p>
        <p><strong>Sauce:</strong> {pizza.sauce}</p>
        <p><strong>Cheese:</strong> {pizza.cheese}</p>
        <p><strong>Veggies:</strong> {pizza.veggies.join(', ') || "None"}</p>
        <button className="order-button" onClick={handlePlaceOrder}>
          Place Order & Pay
        </button>
      </div>
    );
  };

  return (
    <div className="builder-container">
      <h1 className="main-heading">🍕 Custom Pizza Builder</h1>
      {renderStep()}
      <div className="navigation">
        {step > 1 && step <= 5 && (
          <button className="nav-button" onClick={handleBack}>⬅ Back</button>
        )}
        {step < 5 && (
          <button className="nav-button" onClick={handleNext}>Next ➡</button>
        )}
      </div>
    </div>
  );
};

export default CustomPizzaBuilder;
