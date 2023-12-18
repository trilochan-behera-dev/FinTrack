const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../schema/userSchema");
require("dotenv").config();
const { connectCloudinary } = require("../database/connection");

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Please fill details" });
    }

    // Check if the email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const charset =
      "0123456789@ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    const random = Array.from(
      { length: 4 },
      () => charset[Math.floor(Math.random() * charset.length)]
    ).join("");

    // Create a new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      username: name.slice(0, 4) + random,
    });

    await newUser.save();
    res.status(201).json({ message: "Registration successful" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Please fill details" });
    }

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Validate the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate a JWT
    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY);

    const userData = {
      email: user.email,
      name: user.name,
      token: token,
      photo: user?.photo,
    };

    res.status(200).json({ data: userData, message: "Login successful" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

const getUserData = async (req, res) => {
  const userData = await User.findOne({ _id: req.userId }, { password: 0 });

  if (!userData) {
    return res.status(401).json({ message: "Data not found" });
  }

  return res.status(200).json({
    data: userData,
    message: "User fetched successfully",
  });
};

const updateUserData = async (req, res) => {
  const userData = await User.findById(req.userId);

  if (!userData) {
    return res.status(401).json({ message: "No User exist" });
  }

  const updatedData = await User.findByIdAndUpdate(req.userId, req.body, {
    new: true,
  }).select("-password");

  if (!updatedData) {
    return res.status(404).json({ message: "No User Exist" });
  }

  return res.status(200).json({
    data: updatedData,
    message: "User updated successfully",
  });
};

const uploadPhoto = async (req, res) => {
  const userData = await User.findById(req.userId);

  if (!userData) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  try {
    const parser = await connectCloudinary();
    parser.single("photo")(req, res, async (err) => {
      if (err) {
        console.log(err.message);
        return res.status(500).json({ message: "Something Went Wrong !" });
      }

      try {
        const imageUrl = req.file.path;
        const updateUser = await User.findByIdAndUpdate(
          req.userId,
          { photo: imageUrl },
          { new: true }
        ).select("-password");

        return res
          .status(200)
          .json({ data: updateUser, message: "Image upload successfully" });
      } catch (err) {
        // Handle errors related to processing the image
        console.error(err.message);
        return res.status(500).json({ message: "Internal Server Error" });
      }
    });
  } catch (error) {
    // Handle errors related to connecting to Cloudinary
    console.error(error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { login, register, getUserData, updateUserData, uploadPhoto };
