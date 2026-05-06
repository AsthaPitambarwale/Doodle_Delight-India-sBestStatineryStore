const express = require("express");
const router = express.Router();
const Address = require("../models/Address");

// GET
router.get("/:userId", async (req, res) => {
  const addresses = await Address.find({ userId: req.params.userId });
  res.json(addresses);
});

// ADD
router.post("/", async (req, res) => {
  const newAddress = new Address(req.body);
  await newAddress.save();
  res.json(newAddress);
});

module.exports = router;