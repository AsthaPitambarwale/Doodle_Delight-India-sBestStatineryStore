const express = require("express");
const Razorpay = require("razorpay");
const crypto = require("crypto");
const Order = require("../models/Order");
const Notification = require("../models/Notification");
const sendEmail = require("../utils/sendEmail");
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
      email,
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

    const order = await Order.create({
      userId,
      items: cartItems,
      totalAmount,
      paymentId: razorpay_payment_id,
      orderId: razorpay_order_id,
      paymentMethod: "razorpay",
      status: "paid",
    });

    await Notification.create({
      userId,
      title: "Order Confirmed",
      message: `Your order ${order._id} placed successfully`,
      read: false,
      createdAt: new Date(),
    });

    if (email) {
      await sendEmail({
        to: email,
        subject: "Order Confirmed ✅",
        html: `
          <div style="font-family:sans-serif;padding:20px">
            <h2>Payment Successful 🎉</h2>

            <p>Your order has been placed successfully.</p>

            <p>
              <strong>Order ID:</strong> ${order._id}
            </p>

            <p>
              <strong>Amount Paid:</strong> ₹${totalAmount}
            </p>

            <br/>

            <p>Thank you for shopping with Doodle Delight ❤️</p>
          </div>
        `,
      });
    }

    res.json({ success: true, order });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

router.post("/cod-order", async (req, res) => {
  try {
    const { userId, cartItems, totalAmount, email } = req.body;

    const order = await Order.create({
      userId,
      items: cartItems,
      totalAmount,
      paymentMethod: "cod",
      status: "placed",
    });

    // Notification
    await Notification.create({
      userId,
      title: "Order Placed (COD)",
      message: `Your COD order ${order._id} has been placed successfully`,
      read: false,
      createdAt: new Date(),
    });

    // Email
    if (email) {
      await sendEmail({
        to: email,
        subject: "COD Order Placed 📦",
        html: `
          <div style="font-family:sans-serif;padding:20px">
            <h2>Order Placed Successfully 🎉</h2>

            <p>Your Cash on Delivery order has been placed.</p>

            <p>
              <strong>Order ID:</strong> ${order._id}
            </p>

            <p>
              <strong>Total Amount:</strong> ₹${totalAmount}
            </p>

            <br/>

            <p>Thank you for shopping with Doodle Delight ❤️</p>
          </div>
        `,
      });
    }

    res.json({ success: true, order });
  } catch (err) {
    console.error(err);
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
