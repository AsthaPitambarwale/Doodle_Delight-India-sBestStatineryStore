const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const mongoose = require("mongoose");

const PDFDocument = require("pdfkit");

// INVOICE GENERATION
router.get("/invoice/:orderId", async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId);

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    const doc = new PDFDocument({ margin: 50 });

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `inline; filename=invoice-${order._id}.pdf`,
    );

    doc.pipe(res);

    // HEADER
    doc.fontSize(20).text("INVOICE", { align: "center" });
    doc.moveDown();

    // ORDER INFO
    doc.fontSize(12).text(`Order ID: ${order._id}`);
    doc.text(`Status: ${order.status}`);
    doc.text(`Payment: ${order.paymentMethod}`);
    doc.moveDown();

    // ITEMS
    doc.text("Items:", { underline: true });
    doc.moveDown(0.5);

    order.items.forEach((item, index) => {
      doc.text(
        `${index + 1}. ${item.name} | Qty: ${item.quantity} | ₹${item.price}`,
      );
    });

    doc.moveDown();

    // TOTAL
    doc.fontSize(14).text(`Total Amount: ₹${order.totalAmount}`, {
      align: "right",
    });

    doc.moveDown(2);

    doc.text("Thank you for shopping with us!", {
      align: "center",
    });

    doc.end();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Invoice generation failed" });
  }
});

// track order
router.get("/track/:orderId", async (req, res) => {
  const order = await Order.findById(req.params.orderId);
  res.json(order);
});

// CANCEL ORDER
router.put("/cancel/:orderId", async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId);

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    if (order.status === "delivered") {
      return res.json({
        success: false,
        message: "Delivered orders cannot be cancelled",
      });
    }

    order.status = "cancelled";
    await order.save();

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// RETURN / REFUND
router.put("/return/:orderId", async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId);

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    if (order.status !== "paid") {
      return res.json({
        success: false,
        message: "Only paid orders can be returned",
      });
    }

    order.status = "refund_requested";
    await order.save();

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// get orders
router.get("/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    const orders = await Order.find({
      $or: [
        { userId: userId }, // string match
        { userId: new mongoose.Types.ObjectId(userId) }, // ObjectId match
      ],
    });

    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch orders" });
  }
});

module.exports = router;
