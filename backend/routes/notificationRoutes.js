const express = require("express");
const router = express.Router();
const Notification = require("../models/Notification");

// GET notifications
router.get("/:userId", async (req, res) => {
  try {
    const notifications = await Notification.find({
      userId: req.params.userId,
    }).sort({ createdAt: -1 });

    res.json(notifications);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// MARK AS READ
router.put("/read/:id", async (req, res) => {
  await Notification.findByIdAndUpdate(req.params.id, { read: true });
  res.json({ success: true });
});

module.exports = router;