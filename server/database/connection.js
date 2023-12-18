const mongoDB = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
// for cloudinary
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

const mongo_url = process.env.MONGO_URL;
const connectDB = async () => {
  try {
    await mongoDB.connect(mongo_url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("mongodb is connected");
  } catch (err) {
    console.log(err);
  }
};

const connectCloudinary = async () => {
  cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
  });

  // config
  const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    folder: "user-photo",
    allowFormats: ["jpg", "png", "jpeg"],
    transformation: [{ width: 500, height: 500, crop: "limit" }],
  });

  const parser = multer({ storage: storage });

  return parser;
};

module.exports = { connectDB, connectCloudinary };
