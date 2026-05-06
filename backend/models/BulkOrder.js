const mongoose = require("mongoose");

const bulkOrderSchema = new mongoose.Schema(
  {
    companyName: String,
    contactPerson: String,
    email: String,
    phone: String,
    productDetails: String,
    quantity: Number,
    deliveryDate: String,
    additionalNotes: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("BulkOrder", bulkOrderSchema);