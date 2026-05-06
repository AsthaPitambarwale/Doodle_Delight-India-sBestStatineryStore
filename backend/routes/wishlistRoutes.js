const express = require("express");
const router = express.Router();
const Wishlist = require("../models/Wishlist");

// GET wishlist
router.get("/:userId", async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ userId: req.params.userId });

    res.json(wishlist || { items: [] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch wishlist" });
  }
});

// SAVE wishlist (FIXED)
router.post("/save", async (req, res) => {
  try {
    const { userId, items } = req.body;

    const updated = await Wishlist.findOneAndUpdate(
      { userId },
      { $set: { items } },
      { upsert: true, returnDocument: 'after'}
    );

    res.json({ message: "Wishlist saved", wishlist: updated });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to save wishlist" });
  }
});

module.exports = router;