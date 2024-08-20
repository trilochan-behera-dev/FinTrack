const mongoose = require("mongoose");

const incomeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: 'income', // Default value
    },
    category: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    details: {
      type: String,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    versionKey: false, // Disable the version key
    timestamps: true, // Add createdAt and updatedAt fields
  }
);

module.exports = mongoose.model("Income", incomeSchema);
