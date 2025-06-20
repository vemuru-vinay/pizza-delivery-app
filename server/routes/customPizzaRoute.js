import express from "express";
import { saveCustomPizza , getAllOrders } from "../controllers/customPizzaController.js";
import CustomPizza from '../models/CustomPizza.js';


const router = express.Router();


router.post("/save", saveCustomPizza);

// Middleware to check if user is admin
const isAdmin = (req, res, next) => {
  const isAdminUser = req.headers['is-admin']; // send this from frontend
  if (isAdminUser === 'true') {
    next();
  } else {
    res.status(403).json({ error: 'Access denied. Admin only.' });
  }
};

router.get('/admin-orders', isAdmin, async (req, res) => {
  try {
    const orders = await CustomPizza.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch admin orders' });
  }
});

router.get('/all-orders', async (req, res) => {
  try {
    console.log("🔍 Fetching all custom pizza orders...");
    const orders = await CustomPizza.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    console.error('❌ Error fetching orders:', error);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

router.post('/create', async (req, res) => {
  try {
    const { base, sauce, cheese, veggies, orderId, amountPaid } = req.body;

    const newPizza = new CustomPizza({ base, sauce, cheese, veggies, orderId, amountPaid });
    await newPizza.save();

    res.status(200).json({ message: 'Custom pizza saved to database!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to save custom pizza' });
  }
});

router.post("/place-order", async (req, res) => {
  try {
    const { base, sauce, cheese, veggies, userId } = req.body;
    const order = new CustomPizza({ base, sauce, cheese, veggies, userId });
    await order.save();
    res.status(201).json({ message: "Order saved" });
  } catch (err) {
    res.status(500).json({ message: "Failed to save order" });
  }
});

export default router;