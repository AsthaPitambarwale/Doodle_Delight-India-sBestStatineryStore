const express = require("express");
const router = express.Router();

const multer = require("multer");
const csv = require("csv-parser");
const fs = require("fs");

const Product = require("../models/Product");
const {
  getProducts,
  getFeaturedProducts,
  getProduct,
  searchProducts,
} = require("../controllers/productController");

// NORMAL ROUTES
router.get("/", getProducts);
router.get("/featured", getFeaturedProducts);
router.get("/search", searchProducts);

router.get("/:id/related", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) return res.status(404).json([]);

    const related = await Product.find({
      _id: { $ne: product._id },
      category: product.category,
    }).limit(8);

    res.json(related);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/:id/frequently-bought", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) return res.json([]);

    const candidates = await Product.find({
      _id: { $ne: product._id },
    });

    const scored = candidates.map((p) => {
      let score = 0;

      // same category = strong signal
      if (p.category === product.category) score += 5;

      // same brand = medium signal
      if (p.brand === product.brand) score += 3;

      // similar price range = weak signal
      const priceDiff = Math.abs(p.price - product.price);
      if (priceDiff < product.price * 0.3) score += 1;

      // sustainability boost (optional)
      if (p.sustainabilityScore >= 70) score += 1;

      return { product: p, score };
    });

    const result = scored
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)
      .map((s) => s.product);

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// BULK UPLOAD (CSV)

const upload = multer({ dest: "uploads/" });

router.post("/bulk-upload", upload.single("file"), async (req, res) => {
  try {
    const results = [];

    fs.createReadStream(req.file.path)
      .pipe(csv())
      .on("data", (data) => results.push(data))
      .on("end", async () => {
        await Product.insertMany(results);

        fs.unlinkSync(req.file.path); // cleanup temp file

        res.json({
          success: true,
          inserted: results.length,
        });
      });
  } catch (err) {
    res.status(500).json({ message: "Bulk upload failed", error: err.message });
  }
});

// CREATE PRODUCT
router.post("/", async (req, res) => {
  try {
    const product = await Product.create({
      ...req.body,
      price: Number(req.body.price),
      stock: Number(req.body.stock),
      images: req.body.images || [],
    });

    res.json(product);
  } catch (err) {
    res.status(500).json({ message: "Create failed" });
  }
});

// UPDATE PRODUCT
router.put("/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.json(product);
  } catch (err) {
    res.status(500).json({ message: "Update failed" });
  }
});

// DELETE PRODUCT

router.delete("/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ message: "Delete failed" });
  }
});

// GET SINGLE PRODUCT
router.get("/:id", getProduct);

module.exports = router;
