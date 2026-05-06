const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    _id: String,
    name: String,
    slug: String,
    image: String,
    productCount: String,
});

module.exports = mongoose.model("Category", categorySchema);
