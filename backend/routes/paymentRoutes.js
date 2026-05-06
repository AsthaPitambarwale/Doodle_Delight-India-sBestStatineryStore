const express = require("express");
const Razorpay = require("razorpay");
const crypto = require("crypto");
const Order = require("../models/Order");

const router = express.Router();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

//CREATE ORDER
router.post("/create-order", async (req, res) => {
  try {
    const { amount } = req.body;

    console.log("Incoming amount:", amount);

    if (!amount || isNaN(amount)) {
      return res.status(400).json({ error: "Invalid amount" });
    }

    const options = {
      amount: Math.round(amount * 100),
      currency: "INR",
      receipt: "receipt_" + Date.now(),
    };

    const order = await razorpay.orders.create(options);

    res.json(order);
  } catch (err) {
    console.error("CREATE ORDER ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});

//VERIFY PAYMENT
router.post("/verify-payment", async (req, res) => {
  try {
    const {
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature,
      userId,
      cartItems,
      totalAmount,
    } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expected = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expected !== razorpay_signature) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid signature" });
    }

    await Order.create({
      userId,
      items: cartItems,
      totalAmount,
      paymentId: razorpay_payment_id,
      orderId: razorpay_order_id,
      paymentMethod: "razorpay",
      status: "paid",
    });

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// COD ORDER
router.post("/cod-order", async (req, res) => {
  try {
    const { userId, cartItems, totalAmount } = req.body;

    const order = await Order.create({
      userId,
      items: cartItems,
      totalAmount,
      paymentMethod: "cod",
      status: "placed",
    });

    res.json({ success: true, order });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//GET ORDERS
router.get("/my-orders/:userId", async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId });

    const stats = {
      total: orders.length,
      paid: orders.filter((o) => o.status === "paid").length,
      cancelled: orders.filter((o) => o.status === "cancelled").length,
    };

    res.json({ orders, stats });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
