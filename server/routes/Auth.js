// routes/Auth.js
import express from 'express';
import { registerUser, loginUser, forgotPassword, resetPassword} from '../controllers/AuthController.js';
import protect from '../middleware/authMiddleware.js';
import jwt from 'jsonwebtoken'; // ⬅ Add this at the top if not already imported
import bcrypt from 'bcryptjs';   // ⬅ Ensure bcrypt is also imported
import User from '../models/User.js'; // ⬅ Required if not already imported

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:id/:token", resetPassword);


// Protected route test
router.get('/dashboard', protect, (req, res) => {
  res.json({ message: `Welcome to dashboard, User ID: ${req.user.id}` });
});

router.get('/verify/:token', async (req, res) => {
  try {
    const user = await User.findOne({ verificationToken: req.params.token });
    if (!user) return res.status(400).send("Invalid or expired token");

    user.isVerified = true;
    user.verificationToken = undefined;
    await user.save();

    res.status(200).send("Email verified successfully ✅");
  } catch (err) {
    res.status(500).send("Something went wrong");
  }
});


router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log("📩 Login request:", email, password);

  try {
    const user = await User.findOne({ email });
    if (!user) {
      console.log("❌ User not found");
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("❌ Password mismatch");
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // ✅ Generate token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    // ✅ Send full user info back
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token,
    });
  } catch (error) {
    console.error("❌ Login Error:", error);
    res.status(500).json({ message: "Server error during login" });
  }
});

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check for existing user
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      isAdmin: false // normal user
    });

    const savedUser = await newUser.save();

    res.status(201).json({
      _id: savedUser._id,
      name: savedUser.name,
      email: savedUser.email,
      isAdmin: savedUser.isAdmin
    });
  } catch (error) {
    console.error("Register Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};


export default router;
