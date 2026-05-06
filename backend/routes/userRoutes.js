const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.put("/update/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      returnDocument: 'after'
    });

    res.json({ user });
  } catch (err) {
    res.status(500).json({ message: "Update failed" });
  }
});

router.patch("/status/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { isActive: req.body.isActive },
      { returnDocument: "after" }
    );

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Status update failed" });
  }
});

module.exports = router;
