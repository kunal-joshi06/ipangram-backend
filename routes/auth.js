const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

//Signup
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password, role, location } = req.body;

    if (!email || !password || !role || !location || !name) {
      return res.status(400).json({ error: "Missing required fields." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      email,
      password: hashedPassword,
      role,
      location,
      name,
    });

    await user.save();

    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Missing required fields." });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
