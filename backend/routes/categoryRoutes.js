const express = require("express");
const router = express.Router();
const Category = require("../models/Category");

// GET ALL
router.get("/", async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch {
    res.status(500).json({ message: "Fetch failed" });
  }
});

// CREATE
router.post("/", async (req, res) => {
  try {
    const { name, slug, image } = req.body;

    const category = await Category.create({
      name,
      slug,
      image,
      productCount: 0,
    });

    res.json(category);
  } catch (err) {
    res.status(500).json({ message: "Create failed" });
  }
});

// UPDATE (IMPORTANT: KEEP SAME METHOD AS FRONTEND)
router.patch("/:id", async (req, res) => {
  try {
    const { name, slug, image } = req.body;

    const updated = await Category.findByIdAndUpdate(
      req.params.id,
      { name, slug, image },
      { returnDocument: "after" }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Update failed" });
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch {
    res.status(500).json({ message: "Delete failed" });
  }
});

module.exports = router;
