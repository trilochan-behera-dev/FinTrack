const express = require("express");
const {
  getAllDetails,
  createDetails,
  updateDetailsById,
  deleteDetailsById,
} = require("../controller/detailsController");
const verify = require("../middleware/verifyToken"); /// Add middleware to the routes

const router = express.Router();

router.get("/details", verify, getAllDetails);
router.post("/details", verify, createDetails);
router.patch("/details/:id", verify, updateDetailsById);
router.delete("/details/:id", verify, deleteDetailsById);

module.exports = router;
