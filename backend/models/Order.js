const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  items: [
    {
      name: String,
      price: Number,
      quantity: Number,
      image: String,
      brand: String,
    },
  ],
  totalAmount: Number,
  paymentId: String,
  orderId: String,
  paymentMethod: {
    type: String,
    enum: ["razorpay", "cod"],
    default: "razorpay",
  },
  status: {
    type: String,
    enum: [
      "placed",
      "paid",
      "shipped",
      "delivered",
      "cancelled",
      "refund_requested",
      "refunded",
    ],
    default: "placed",
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Order", orderSchema);
