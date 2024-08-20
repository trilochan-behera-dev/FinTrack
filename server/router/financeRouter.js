const express = require("express");


const {
  getAllFinance,
  getFinanceByType,
  createFinanceByType,
  createBulkFinanceByType,
  updateFinanceById,
  updateBulkFinanceByIds,
  deleteFinanceById,
  deleteBulkFinanceByIds
} = require("../controller/financeController");
const verify = require("../middleware/verifyToken"); /// Add middleware to the routes

const router = express.Router();

router.get("/allData", verify, getAllFinance);
router.get("/allData/type", verify, getFinanceByType);
router.post("/createData", verify, createFinanceByType);
router.post("/createBulkData", verify, createBulkFinanceByType);
router.post("/updateData/:id", verify, updateFinanceById);
router.post("/updateBulkData/:id", verify, updateBulkFinanceByIds);
router.post("/deleteData/:id", verify, deleteFinanceById);
router.post("/deleteBulkData/:id", verify, deleteBulkFinanceByIds);


module.exports = router;