// server/controllers/customPizzaController.js
import CustomPizza from "../models/CustomPizza.js";
import Order from '../models/Order.js';

export const saveCustomPizza = async (req, res) => {
  try {
    const pizza = new CustomPizza(req.body);
    const saved = await pizza.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ message: "Failed to save order", error });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    console.log("🎯 Fetched Orders:", orders); // 👉 Add this
    res.status(200).json(orders);
  } catch (err) {
    console.error("❌ Error fetching orders:", err);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
};

