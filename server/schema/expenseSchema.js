const mongoDB = require("mongoose");

const expenseSchema = new mongoDB.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    type: {
      type: String,
      default: 'expense', // Default value
    },
    category: {
      type: String,
      require: true,
    },
    date: {
      type: Number,
      require: true,
    },
    month: {
      type: Number,
      require: true,
    },
    year: {
      type: Number,
      require: true,
    },
    price: {
      type: Number,
      require: true,
    },
    modeOfPayment: {
      type: String,
      require: true,
    },
    paymentStatus: {
      type: Boolean,
      require: true,
    },
    details: {
      type: String,
      require: true,
    },
    user: {
      type: mongoDB.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    versionKey: false, // Disable the version key
    timestamps: true, // Add createdAt and updatedAt fields
  }
);

module.exports = mongoDB.model("Expense", expenseSchema);
