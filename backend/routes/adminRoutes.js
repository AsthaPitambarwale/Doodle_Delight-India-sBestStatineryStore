const express = require("express");
const router = express.Router();

const User = require("../models/User");
const Order = require("../models/Order");
const Product = require("../models/Product");

router.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch {
    res.status(500).json({ message: "Failed to fetch users" });
  }
});

router.delete("/users/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted" });
  } catch {
    res.status(500).json({ message: "Delete failed" });
  }
});

router.get("/orders", async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("userId", "name email")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to fetch orders" });
  }
});

router.patch("/orders/:id/status", async (req, res) => {
  try {
    const { status } = req.body;

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // ensure array exists
    if (!order.statusHistory) {
      order.statusHistory = [];
    }

    order.status = status;

    // COD logic
    if (status === "delivered" && order.paymentMethod === "cod") {
      order.paymentReceived = true;
    }

    // push safely
    order.statusHistory.push({
      status,
      updatedAt: new Date(),
    });

    await order.save();

    res.json(order);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/stats", async (req, res) => {
  try {
    const users = await User.countDocuments();
    const orders = await Order.countDocuments();
    const products = await Product.countDocuments();

    const revenueData = await Order.find();

    const revenue = revenueData.reduce(
      (sum, o) => sum + (o.totalAmount || 0),
      0,
    );

    // fake monthly chart (you can improve later)
    const revenueChart = [
      { month: "Jan", revenue: 12000 },
      { month: "Feb", revenue: 18000 },
      { month: "Mar", revenue: 15000 },
      { month: "Apr", revenue: 22000 },
      { month: "May", revenue },
    ];

    res.json({
      users,
      orders,
      products,
      revenue,
      revenueChart,
    });
  } catch {
    res.status(500).json({ message: "Stats failed" });
  }
});

module.exports = router;

// TOP CUSTOMERS (by revenue)
router.get("/top-customers", async (req, res) => {
  try {
    const data = await Order.aggregate([
      {
        $match: { userId: { $ne: null } },
      },
      {
        $group: {
          _id: "$userId", // still string
          totalSpent: { $sum: "$totalAmount" },
          orders: { $sum: 1 },
        },
      },
      {
        $sort: { totalSpent: -1 },
      },
      {
        $limit: 5,
      },
    ]);

    // 🔥 FIX: convert string → ObjectId
    const mongoose = require("mongoose");

    const userIds = data.map((d) => new mongoose.Types.ObjectId(d._id));

    const users = await User.find({ _id: { $in: userIds } });

    const result = data.map((d) => {
      const user = users.find((u) => u._id.toString() === d._id);

      return {
        _id: d._id,
        name: user?.name || "Unknown",
        spent: d.totalSpent || 0,
        orders: d.orders || 0,
      };
    });

    res.json(result);
  } catch (err) {
    console.log("TOP CUSTOMER ERROR:", err);
    res.status(500).json({ message: "Top customers failed" });
  }
});

// LOW STOCK (stock < 15)
router.get("/low-stock", async (req, res) => {
  try {
    const products = await Product.find({ stock: { $lt: 15 } }).select(
      "name stock",
    );

    res.json(products);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Low stock failed" });
  }
});
