const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  phone: String,
  userType: {
    type: String,
    enum: ["retail", "wholesale"],
    default: "retail",
  },
  companyName: String,
  gstNumber: String,
  isActive: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("User", userSchema);
