const mongoose = require("mongoose");

const savingSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: 'subscription', // Default value
    },
    startDate:{
      type:Date,
      required:true
    },
    cycle:{
      type:String,
      required:true,
    },
    endDate:{
      type:Date,
    },  	
    price: {
      type: Number,
      required: true,
    },
    details: {
      type: String,
      required: true,
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

module.exports = mongoose.model("saving", savingSchema);
