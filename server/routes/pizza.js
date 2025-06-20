// server/routes/pizza.js
import express from "express";
import Pizza from "../models/Pizza.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const pizzas = await Pizza.find();
    res.status(200).json(pizzas);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch pizzas" });
  }
});


export default router;
