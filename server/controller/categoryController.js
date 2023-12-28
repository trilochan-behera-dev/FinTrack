const Category = require("../schema/categorySchema");
const Details = require("../schema/detailsSchema");
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types; // Import ObjectId directly from mongoose.Types

const getAllCategory = async (req, res) => {
  try {
    const userId = req.userId;
    const category = await Category.find({ user: userId });
    res.status(200).json({
      data: category,
      message: "Category get Successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
const getCategoryByName = async (req, res) => {
  try {
    const category = await Category.find(
      { user: new ObjectId(req.userId), categoryType: req.params.id }, // Query conditions
      "categoryName colorCode",
      { sort: { categoryName: 1 } } // Sort options
    );
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    res
      .status(200)
      .json({ data: category, message: "Category get Successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
const createCategory = async (req, res) => {
  try {
    if (Object.keys(req.body).length) {
      const filterdata = req.body.filter(
        (item) => item.categoryName.trim() !== ""
      );

      if (!filterdata?.length) {
        return res.status(400).json({
          message: "Data is empty to create category",
        });
      }

      // Data in the database
      const databaseData = await Category.find();
      // Identify entries not present in the database
      const newEntries = filterdata.filter(
        (entry) =>
          !databaseData.some(
            (dbEntry) =>
              dbEntry.categoryName === entry.categoryName &&
              dbEntry.categoryType === entry.categoryType
          )
      );
      const data = newEntries.map((obj) => ({
        ...obj,
        user: req.userId,
      }));

      if (data?.length) {
        await Category.insertMany(data);
        return res.status(201).json({
          message: "Category created successfully",
        });
      } else {
        return res.status(401).json({
          message:
            "Category can't be created, category with same name already exist.",
        });
      }
    } else {
      return res.status(404).json({
        message: "Data is empty to create category",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
const updateCategoryById = async (req, res) => {
  try {
    // Find the existing category
    const existingCategory = await Category.findById(req.params.id);
    if (!existingCategory) {
      return res.status(404).json({ message: "Category not found" });
    }
    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }
    return res.status(200).json({
      data: updatedCategory,
      message: "Category updated successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
const deleteCategoryById = async (req, res) => {
  try {
    const deleteCategoryName = await Category.findById(req.params.id).select(
      "categoryName"
    );
    const isDetailsPresent = await Details.find({
      category: deleteCategoryName.categoryName,
    });

    if (isDetailsPresent?.length) {
      return res
        .status(404)
        .json({ message: "Can't Delete, FinTrack Data are already present for this category" });
    } else {
      const deletedCategory = await Category.findByIdAndDelete(req.params.id);
      if (!deletedCategory) {
        return res.status(404).json({ message: "Category not found" });
      }
      return res.status(200).json({
        data: deletedCategory,
        message: "Category deleted successfully",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  getAllCategory,
  getCategoryByName,
  createCategory,
  updateCategoryById,
  deleteCategoryById,
};
