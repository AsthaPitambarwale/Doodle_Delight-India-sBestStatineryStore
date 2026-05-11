const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

const updateProducts = async () => {
  const db = mongoose.connection.db;

  const updates = [
    { category: "desk-organizers", sustainabilityScore: 85 },
    { category: "notebooks",sustainabilityScore: 80 },
    { category: "pens-pencils", sustainabilityScore: 65 },
    { category: "art-supplies",  sustainabilityScore: 60 },
    { category: "school-essentials", sustainabilityScore: 75 },
  ];

  try {
    for (const item of updates) {
      const result = await db.collection("products").updateMany(
        { category: item.category },
        {
          $set: {
            sustainabilityScore: item.sustainabilityScore,
          },
        }
      );

      console.log(
        `✔ ${item.category}: ${result.modifiedCount} updated`
      );
    }

    console.log("🎉 All products updated!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Update failed:", err);
    process.exit(1);
  }
};

const run = async () => {
  await connectDB();
  await updateProducts();
};

run();