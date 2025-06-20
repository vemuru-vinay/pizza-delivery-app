// middleware/authMiddleware.js
import jwt from 'jsonwebtoken';

const protect = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) return res.status(401).json({ message: 'Access denied. No token provided.' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // You can access req.user.id later
    next();
  } catch (err) {
    res.status(400).json({ message: 'Invalid token' });
  }
};

export default protect;
