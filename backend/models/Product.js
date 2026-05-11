const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  name: String,
  description: String,
  category: String,
  price: Number,
  wholesalePrice: Number,

  tierPricing: [
    {
      minQty: Number,
      price: Number,
    },
  ],

  images: [String],

  stock: Number,
  brand: String,
  featured: Boolean,

  sustainabilityScore: {
    type: Number,
    default: 0, // 0 - 100
    min: 0,
    max: 100,
  },
});

module.exports = mongoose.model("Product", productSchema);