const express = require("express");
const {
  login,
  register,
  getUserData,
  updateUserData,
  uploadPhoto
} = require("../controller/userController");
const verify = require("../middleware/verifyToken"); /// Add middleware to the routes

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/user", verify, getUserData);
router.put("/updateuser", verify, updateUserData);
router.post("/upload", verify, uploadPhoto);

module.exports = router;
