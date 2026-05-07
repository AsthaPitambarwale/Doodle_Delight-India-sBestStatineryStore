const express = require("express");
const { login, signup } = require("../controllers/authController");

const router = express.Router();

router.post("/login", login);
router.post("/signup", signup);

router.post("/google-login", async (req, res) => {
  try {
    const { name, email } = req.body;

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        name,
        email,
        password: "GOOGLE_LOGIN",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      },
    );

    res.json({
      success: true,
      token,
      user,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
      message: "Google login failed",
    });
  }
});

module.exports = router;