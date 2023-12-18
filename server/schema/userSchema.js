const mongoDB = require("mongoose");

const userSchema = new mongoDB.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
    },
    username: {
      type: String,
    },
    bio: {
      type: String,
    },
    photo: {
      type: String,
    },
  },
  {
    versionKey: false, // Disable the version key
    timestamps: true, // Add createdAt and updatedAt fields
  }
);

module.exports = mongoDB.model("User", userSchema);
