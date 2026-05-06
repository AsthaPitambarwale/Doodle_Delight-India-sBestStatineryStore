const express = require("express");
const router = express.Router();
const BulkOrder = require("../models/BulkOrder");

router.post("/", async (req, res) => {
  try {
    const order = new BulkOrder(req.body);
    await order.save();

    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;