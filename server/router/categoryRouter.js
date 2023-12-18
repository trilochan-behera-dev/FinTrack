const express = require("express");
const {
  getAllCategory,
  getCategoryByName,
  createCategory,
  updateCategoryById,
  deleteCategoryById,
} = require("../controller/categoryController");
const verify = require("../middleware/verifyToken"); /// Add middleware to the routes

const router = express.Router();

router.get("/category", verify, getAllCategory);
router.get("/category/:id", verify, getCategoryByName);
router.post("/category", verify, createCategory);
router.put("/category/:id", verify, updateCategoryById);
router.delete("/category/:id", verify, deleteCategoryById);


module.exports = router;
