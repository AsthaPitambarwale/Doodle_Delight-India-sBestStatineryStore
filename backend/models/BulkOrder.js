const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  name: String,
  phone: String,
  address: String,
  city: String,
  pincode: String,
});

const bulkOrderSchema = new mongoose.Schema(
  {
    orderType: {
      type: String,
      enum: ["fast", "repeat", "split"],
      default: "fast",
    },

    companyName: String,
    contactPerson: String,
    email: String,
    phone: String,

    productDetails: String,
    quantity: Number,
    deliveryDate: String,
    additionalNotes: String,

    //Repeat order support
    repeatOrderId: String,

    // Split delivery support
    addresses: [addressSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("BulkOrder", bulkOrderSchema);