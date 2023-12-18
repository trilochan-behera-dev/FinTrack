const Details = require("../schema/detailsSchema");

const getAllDetails = async (req, res) => {
  try {
    const { date, status, type } = req.query;
    if (!date) {
      return res.status(401).json({ message: "Invalid date" });
    }
    let details = [];
    const [year, month] = date.split("-");
    const query = { year: year, month: month, user: req.userId };
    if (status) query.paymentStatus = status === "paid";
    if (type) query.type = type;
    details = await Details.find(query).sort({ date: -1, _id: -1 });

    return res.status(200).json({
      data: details,
      message: "Data get Successfully",
    });
  } catch (error) {
    console.log("error: ", error);
    res.status(500).json({ message: "Server error" });
  }
};
const createDetails = async (req, res) => {
  try {
    if (Object.keys(req.body).length) {
      if (!req.body.name) {
        return res
          .status(401)
          .json({ message: "Data is empty to create new details" });
      } else {
        let allData = req.body;
        const [year, month, date] = allData.selectedDate.split("-");
        allData = {
          ...allData,
          date: date,
          month: month,
          year: year,
          user: req.userId,
        };
        const newDetails = new Details(allData);
        await newDetails.save();
        return res
          .status(201)
          .json({ message: "New Data created successfullys" });
      }
    } else {
      return res.status(401).json({ message: "Invalid Credentials" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
const updateDetailsById = async (req, res) => {
  try {
    let message = "";
    if (!Object.keys(req.body).length) {
      message = "Data is empty for update";
    } else {
      const existingDetails = await Details.findById(req.params.id);
      if (!existingDetails) {
        return res.status(404).json({ error: "Details not found for update" });
      } else {
        const updatedDetails = await Details.findOneAndUpdate(
          { _id: req.params.id, user: req.userId },
          { $set: req.body },
          { new: true }
        );
        if (!updatedDetails) {
          message = "Failed to update the data";
        } else {
          return res.status(200).json({
            data: updatedDetails,
            message: "Data updated successfully",
          });
        }
      }
    }
    return res.status(401).json({ message });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const deleteDetailsById = async (req, res) => {
  try {
    const deletedDetails = await Details.findByIdAndDelete(req.params.id);
    if (!deletedDetails) {
      return res.status(404).json({ error: "Details not found" });
    }
    return res.status(200).json({
      data: deletedDetails,
      message: "Details deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getAllDetails,
  createDetails,
  updateDetailsById,
  deleteDetailsById,
};
