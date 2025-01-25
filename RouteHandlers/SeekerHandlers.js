const SeekerModel = require("../Models/SeekerModel");
exports.createSeeker = async (req, res) => {
  try {
    const { cnic } = req.body;

    const existingSeeker = await SeekerModel.findOne({ cnic });
    if (existingSeeker) {
      return res.status(400).json({
        message: "Seeker already exists with this CNIC",
      });
    }

    req.body.assistancestatus = "pending";

    const seeker = await SeekerModel.create(req.body);

    res.status(201).json({
      status: "success",
      message: "Beneficiary added successfully",
      data: seeker,
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: `Something went wrong: ${err.message}`,
    });
  }
};
   

exports.getAllSeekers = async (req, res) => {
  try {
    const all_benificiary = await SeekerModel.find();

    res.status(200).json({
      status: "success",
      message: "Benificaries fethced successfully",
      data: all_benificiary,
    });
  } catch (err) {
    res.status(400).json({
      status: "falied",
      message: `Something Went Wrong ${err.message}`,
    });
  }
};

exports.findSeeker = async (req, res) => {
  try {
    const { cnic } = req.body;

    const find_seeker = await SeekerModel.findOne({ cnic });
    if (!find_seeker) {
      return res.status(404).json({
        status: "failed",
        message: "benificairy bot found",
      });
    }
    res.status(200).json({
      status: "success",
      message: "Benificaries fethced successfully",
      data: find_seeker,
    });
  } catch (err) {
    res.status(400).json({
      status: "falied",
      message: `Something Went Wrong ${err.message}`,
    });
  }
};
