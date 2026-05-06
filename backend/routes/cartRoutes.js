const express = require("express");
const router = express.Router();
const Cart = require("../models/Cart");

// GET CART
router.get("/:userId", async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });
    res.json(cart || { items: [] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch cart" });
  }
});

// SAVE CART (FIXED)
router.post("/save", async (req, res) => {
  try {
    const { userId, items } = req.body;

    await Cart.findOneAndUpdate(
      { userId },
      { $set: { items } },
      { upsert: true, returnDocument: 'after' }
    );

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to save cart" });
  }
});

module.exports = router;