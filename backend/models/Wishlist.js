const mongoose = require("mongoose");

const wishlistSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  items: [
    {
      _id: String,
      name: String,
      price: Number,
      wholesalePrice: Number,
      brand: String,
      image: String,
      stock: Number,
    },
  ],
});

module.exports = mongoose.model("Wishlist", wishlistSchema);