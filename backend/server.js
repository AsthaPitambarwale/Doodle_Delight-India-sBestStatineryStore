const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();

connectDB();

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://doodle-delight-india-s-best-statine.vercel.app",
    ],
    credentials: true,
  }),
);
app.use(express.json());

// ROUTES
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/categories", require("./routes/categoryRoutes"));
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/bulk-orders", require("./routes/bulkOrderRoutes"));
app.use("/api/cart", require("./routes/cartRoutes"));
app.use("/api/payment", require("./routes/paymentRoutes"));
app.use("/api/orders", require("./routes/orderRoutes"));
app.use("/api/wishlist", require("./routes/wishlistRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/address", require("./routes/addressRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));

app.get("/", (req, res) => {
  res.send("API Running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
