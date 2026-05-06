const User = require("../models/User");
const bcrypt = require("bcryptjs");

// Signup
const signup = async (req, res) => {
  try {
    const { name, email, password, phone, userType, companyName, gstNumber } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      phone,
      userType,
      companyName,
      gstNumber,
    });

    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Login
// Login
const login = async (req, res) => {
  try {
    const { email, password, userType: requestedType } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid password" });

    if (requestedType && user.userType !== requestedType) {
      return res.status(403).json({
        message: `This account is registered as ${user.userType}`,
        userType: user.userType,
      });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { signup, login };