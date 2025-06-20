// server/models/Pizza.js
import mongoose from "mongoose";

const pizzaSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: String,
  description: String,
  prices: {
    small: Number,
    medium: Number,
    large: Number,
  },
  category: String,
});

const Pizza = mongoose.model("Pizza", pizzaSchema);
export default Pizza;
