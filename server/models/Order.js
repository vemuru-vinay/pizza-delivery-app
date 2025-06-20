// server/models/Order.js
import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  base: String,
  sauce: String,
  cheese: String,
  veggies: [String],
  customerName: String,
  email: String,
  paymentId: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Order = mongoose.model("Order", orderSchema);
export default Order;
