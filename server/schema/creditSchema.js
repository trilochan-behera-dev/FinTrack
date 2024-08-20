const mongoose = require("mongoose");

const creditSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: 'credit', // Default value
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
      required: true,
    },
    isPaid:{
      type:Boolean,
      default:false,
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

module.exports = mongoose.model("credit", creditSchema);
