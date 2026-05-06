const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  category: String,
  price: Number,
  wholesalePrice: Number,

  images: [String],

  stock: Number,
  brand: String,
  featured: Boolean,
});

module.exports = mongoose.model("Product", productSchema);