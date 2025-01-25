const mongoose = require("mongoose");
const validator = require("validator")
const SeekerSchema = new mongoose.Schema({
  cnic: {
    type: String,
    required: [true, "Cnic is required"],
    unique: true,
    minlength: 13,  },
  phone: {
    type: String,
    required: [true, "Phone is required"],
    unique: true,
  },
  name: {
    type: String,
    required: [true, "name is required"],
    unique: true,
    validate: [validator.isAlpha, "Name should only contain letters"],
  },
  address: {
    type: String,
    required: [true, "Address is required"],
  },
  purpose: {
    type: String,
    required: [true, "Purpose is required"],
  },
  assistancestatus: {
    type: String,
    enum: ["none", "pending", "approved", "rejected"],
    default: "none",
  }
  
});

const SeekerModel = mongoose.model('beneficiary', SeekerSchema);

module.exports = SeekerModel;
