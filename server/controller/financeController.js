const Expense = require("../schema/expenseSchema");
const Income = require("../schema/incomeSchema");
const Saving = require("../schema/savingSchema");
const Category=require("../schema/categorySchema")
const handleResponse=require("../util/response")

const getModelByType = (res, type) => {
  switch (type) {
    case "expense":
      return Expense;
    case "income":
      return Income;
    case "saving":
      return Saving;
    default:
      return handleResponse(res, 401, null, "Invalid type provided");
  }
};


const getAllFinance=async(req, res)=>{
  try {
    const { date } = req.query;
    if (!date) {
      return handleResponse(res, 401, null, "Invalid date");
    }

    const [year, month] = date.split("-");

    // Construct start and end dates for the month
    const startDate = new Date(`${year}-${month}-01T00:00:00.000Z`);
    const endDate = new Date(startDate);
    endDate.setMonth(endDate.getMonth() + 1); // Move to the next month
    endDate.setDate(0); // Move to the last day of the current month

    // Construct the query
    const query = {
      user: req.userId,
      date: { $gte: startDate, $lt: endDate }
    };
    const allModels= [Expense, Income, Saving]
    const results = await Promise.all(
      allModels.map((Model) => Model.find(query))
    );
    // Flatten the results into a single array
    let details = results.flat();
    // Sort the combined array by date and _id
    details = details.sort((a, b) => {
      if (a.date > b.date) return -1;
      if (a.date < b.date) return 1;
      if (a._id > b._id) return -1;
      if (a._id < b._id) return 1;
      return 0;
    });
    
    return handleResponse(res, 200, details, "Data get Successfully");
  } catch (error) {
    return handleResponse(res, 500, null, "Something went wrong!", error.message);
  }
}

const getFinanceByType=async(req, res)=>{
  try {
    const { date, type } = req.query;
    if (!date) {
      return handleResponse(res, 401, null, "Invalid date");
    }
    const Model= getModelByType(res, type);
    const [year, month] = date.split("-");
    // Construct start and end dates for the month
    const startDate = new Date(`${year}-${month}-01T00:00:00.000Z`);
    const endDate = new Date(startDate);
    endDate.setMonth(endDate.getMonth() + 1); // Move to the next month
    endDate.setDate(0); // Move to the last day of the current month

    // Construct the query
    const query = {
      user: req.userId,
      date: { $gte: startDate, $lt: endDate }
    };

    const details = await Model.find(query).sort({ date: -1, _id: -1 });

    return handleResponse(res, 200, details, "Data get Successfully");
  } catch (error) {
    return handleResponse(res, 500, null, "Something went wrong!", error.message);
  }
}

const createFinanceByType = async (req, res) => {
  try {
    if (Object.keys(req.body).length) {
      let {title, type, category, date, price, details} = req.body;
      const Model= getModelByType(res, type);
      if (!title || !category || !date || !price ) {
        return handleResponse(res, 401, null, "Please enter all the required data");
      } else {
        // Query the database to check if the category exists for the user
        const categoryFound = await Category.findOne({ user: req.userId, categoryName: category, categoryType: type})
        if (!categoryFound) return handleResponse(res, 404, null, "Category not found for the user");

        let allData = {
          title, category, date, price, details,
          user: req.userId,
        };
        const newDetails = new Model(allData);
        await newDetails.save();
        return handleResponse(res, 201, null, "New Data created successfullys");
      }
    } else {
      return handleResponse(res, 401, null, "Invalid Credentials");
    }
  } catch (error) {
    return handleResponse(res, 500, null, "Something went wrong!", error.message);
  }
};

const createBulkFinanceByType = async (req, res) => {
  try {
    if (Array.isArray(req.body) && req.body.length > 0) {
      const entries = req.body;

      let categorizedEntries = {
        expense: [],
        income: [],
        saving: []
      };

      // Validation and Categorization Phase
      for (let entry of entries) {
        let { title, type, category, date, price, details } = entry;

        if (!title || !category || !date || !price) {
          return handleResponse(res, 401, null, `Please enter all the required data for ${title}`);
        }

        // Query the database to check if the category exists for the user
        const categoryFound = await Category.findOne({ user: req.userId, categoryName: category, categoryType: type });
        if (!categoryFound) {
          return handleResponse(res, 401, null, `Please select a valid category for ${title}`);
        }

        // Categorize the valid entry by type
        categorizedEntries[type]?.push({
          title, category, date, price, details,
          user: req.userId,
        });
      }

      // Save Phase - Insert data into respective models
      for (const [type, data] of Object.entries(categorizedEntries)) {
        if (data.length > 0) {
          const Model = getModelByType(res, type);
          await Model.insertMany(data); // Save all valid entries of this type at once
        }
      }

      return handleResponse(res, 201, null, "All data created successfully");
    } else {
      return handleResponse(res, 401, null, "Invalid request format. Expected an array of entries.");
    }
  } catch (error) {
    return handleResponse(res, 500, null, "Something went wrong!", error.message);
  }
};

const updateFinanceById = async (req, res) => {
  try {
    if (!Object.keys(req.body).length) {
      return handleResponse(res, 400, null, "Data is empty for update");
    }

    let { type } = req.body;
    const Model = getModelByType(res, type);

    // Find the existing record by ID
    const existingDetails = await Model.findOne({ _id: req.params.id, user: req.userId });
    if (!existingDetails) {
      return handleResponse(res, 404, null, "Details not found for update");
    }

    // Update the record
    const updatedDetails = await Model.findOneAndUpdate(
      { _id: req.params.id, user: req.userId },
      { $set: req.body },
      { new: true }
    );

    if (!updatedDetails) {
      return handleResponse(res, 400, null, "Failed to update the data");
    }

    return handleResponse(res, 200, updatedDetails, "Data updated successfully");
  } catch (error) {
    console.error(error);
    return handleResponse(res, 500, null, "Internal Server Error", error.message);
  }
};


const updateBulkFinanceByIds = async (req, res) => {
  try {
    if (!Array.isArray(req.body) || req.body.length === 0) {
      return handleResponse(res, 400, null, "Invalid request format. Expected an array of entries.");
    }

    const entries = req.body;

    let categorizedEntries = {
      expense: [],
      income: [],
      saving: []
    };

    // Validation and Categorization Phase
    for (let entry of entries) {
      let { id, type, title, category, date, price, details } = entry;

      if (!id || !type) {
        return handleResponse(res, 400, null, "ID and type are required for update.");
      }

      const Model = getModelByType(res, type);

      // Find the existing record by ID
      const existingDetails = await Model.findOne({ _id: id, user: req.userId });
      if (!existingDetails) {
        return handleResponse(res, 404, null, `Details not found for update for ID: ${id}`);
      }

      // Categorize the valid entry by type
      categorizedEntries[type]?.push({
        id,
        update: { title, category, date, price, details }
      });
    }

    // Update Phase - Update data in respective models
    for (const [type, data] of Object.entries(categorizedEntries)) {
      if (data.length > 0) {
        const Model = getModelByType(res, type);

        // Using `bulkWrite` for multiple update operations
        const bulkOps = data.map(entry => {
          return {
            updateOne: {
              filter: { _id: entry.id, user: req.userId },
              update: { $set: entry.update },
              upsert: false // Don't create new document if it doesn't exist
            }
          };
        });

        await Model.bulkWrite(bulkOps); // Perform bulk updates
      }
    }

    return handleResponse(res, 200, null, "All data updated successfully");
  } catch (error) {
    console.error(error);
    return handleResponse(res, 500, null, "Internal Server Error", error.message);
  }
};

const deleteFinanceById = async (req, res) => {
  try {
    const { type } = req.params;
    const Model = getModelByType(res, type);

    // Find and delete the record by ID
    const deletedDetails = await Model.findOneAndDelete({ _id: req.params.id, user: req.userId });

    if (!deletedDetails) {
      return handleResponse(res, 404, null, "Details not found for deletion");
    }

    return handleResponse(res, 200, null, "Data deleted successfully");
  } catch (error) {
    console.error(error);
    return handleResponse(res, 500, null, "Internal Server Error", error.message);
  }
};

const deleteBulkFinanceByIds = async (req, res) => {
  try {
    if (!Array.isArray(req.body) || req.body.length === 0) {
      return handleResponse(res, 400, null, "Invalid request format. Expected an array of IDs and types.");
    }

    const entries = req.body;

    let categorizedEntries = {
      expense: [],
      income: [],
      saving: []
    };

    // Categorization Phase
    for (let entry of entries) {
      let { id, type } = entry;

      if (!id || !type) {
        return handleResponse(res, 400, null, "ID and type are required for deletion.");
      }

      // Categorize the entries by type
      categorizedEntries[type]?.push(id);
    }

    // Delete Phase - Delete data in respective models
    for (const [type, ids] of Object.entries(categorizedEntries)) {
      if (ids.length > 0) {
        const Model = getModelByType(res, type);

        // Delete all the documents with the matching IDs
        const deleteResult = await Model.deleteMany({ _id: { $in: ids }, user: req.userId });

        if (deleteResult.deletedCount === 0) {
          return handleResponse(res, 404, null, `No details found for deletion in ${type}`);
        }
      }
    }

    return handleResponse(res, 200, null, "All selected data deleted successfully");
  } catch (error) {
    console.error(error);
    return handleResponse(res, 500, null, "Internal Server Error", error.message);
  }
};


module.exports = {
  getAllFinance,
  getFinanceByType,
  createFinanceByType,
  createBulkFinanceByType,
  updateFinanceById,
  updateBulkFinanceByIds,
  deleteFinanceById,
  deleteBulkFinanceByIds
};