
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import seedRoute from './routes/Seed.js';
import authRoutes from "./routes/Auth.js";
import pizzaRoute from './routes/pizza.js';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import seedRouter from "./routes/Seed.js"; // adjust path if needed
import paymentRoutes from './routes/paymentRoutes.js';
import customPizzaRoute from './routes/customPizzaRoute.js';


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.get('/', (req, res) => {
  res.send('🚀 Pizza App Server is Running');
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.use('/api/custom-pizza', customPizzaRoute);
app.use('/api/payment', paymentRoutes);
app.use("/seed", seedRouter);
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use("/api/seed", seedRoute);
app.use("/api/pizzas", pizzaRoute);
app.use("/api/auth", authRoutes); 

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log("✅ MongoDB Connected");
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB Error:", err);
  });
