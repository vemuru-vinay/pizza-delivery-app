// server/models/CustomPizza.js
import mongoose from "mongoose";

const customPizzaSchema = new mongoose.Schema({
  base: String,
  sauce: String,
  cheese: String,
  veggies: [String],
  user: {
    name: String,
    email: String,
    contact: String
  },
  amount: Number,
  paymentId: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("CustomPizza", customPizzaSchema);
