import express from "express";
import Pizza from "../models/Pizza.js";
import bcrypt from "bcryptjs";
import User from "../models/User.js";

const router = express.Router();

// Updated unique pizza data
const dummyPizzas = [
  {
    name: "Spicy Paneer Tikka",
    price: 279,
    description: "Paneer cubes with spicy tikka sauce and fresh herbs",
    image: "http://localhost:5000/images/paneer_tikka.jpg"
  },
  {
    name: "Cheesy Corn Overload",
    price: 259,
    description: "Creamy corn & melted cheese blend for ultimate indulgence",
    image: "http://localhost:5000/images/cheese_corn.jpg"
  },
  {
    name: "Farmhouse Fiesta",
    price: 289,
    description: "A colorful mix of capsicum, tomato, onion, and sweet corn",
    image: "http://localhost:5000/images/farmhouse_fiesta.png"
  },
  {
    name: "Chicken BBQ Blast",
    price: 299,
    description: "Smoky chicken with tangy BBQ sauce and cheese",
    image: "http://localhost:5000/images/bbq-chicken-pizza-.jpg"
  }
];

// Route to seed pizzas
router.get("/pizzas", async (req, res) => {
  try {
    await Pizza.deleteMany(); // Clean existing
    await Pizza.insertMany(dummyPizzas); // Insert dummy
    res.json({ message: "Seeded successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.get("/admin", async (req, res) => {
  const adminExists = await User.findOne({ email: "admin@example.com" });
  if (adminExists) {
    return res.send("Admin already exists");
  }

  const admin = new User({
    name: "Admin",
    email: "admin@example.com",
    password: bcrypt.hashSync("admin123", 10), // ✅ HASHED
    isAdmin: true,
  });

  await admin.save();
  res.send("✅ Admin user created: admin@example.com / admin123");
});




export default router;
