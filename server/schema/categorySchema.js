const mongoDB = require("mongoose");

const categorySchema = new mongoDB.Schema(
  {
    categoryName: {
      type: String,
      require: true,
    },
    colorCode: {
      type: String,
      require: true,
    },
    categoryType: {
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

module.exports = mongoDB.model("Category", categorySchema);
