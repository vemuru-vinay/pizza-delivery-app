// server/models/User.js

import mongoose from "mongoose";


const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isVerified: {
  type: Boolean,
  default: false,
},
verificationToken: {
  type: String,
},
resetPasswordToken: {
  type: String,
  default: ''
},
resetPasswordExpires: {
  type: Date,
},

  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  }
);

const User = mongoose.model("User", userSchema);

export default User; // ✅ This fixes your issue

