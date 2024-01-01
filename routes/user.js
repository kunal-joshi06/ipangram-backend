const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");

// Create a user
router.post("/", async (req, res) => {
  try {
    const { email, password, role, location, name, department } = req.body;

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
      department,
    });
    await user.save();

    res
      .status(201)
      .json({ message: "User created successfully! Now you can Login", user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Read all with pagination
router.get("/", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const sortBy = req.query.sortBy || "name";
    const sortOrder = req.query.sortOrder === "desc" ? -1 : 1;
    const startIndex = (page - 1) * limit;

    const sortOptions = {};
    sortOptions[sortBy] = sortOrder;

    const users = await User.find()
      .sort(sortOptions)
      .skip(startIndex)
      .limit(limit);
    const totalUsers = await User.countDocuments();

    const pagination = {
      currentPage: page,
      totalPages: Math.ceil(totalUsers / limit),
      totalItems: totalUsers,
    };

    res.status(200).json({ users, pagination });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, role, location, department } = req.body;

    const user = await User.findByIdAndUpdate(
      id,
      { name, email, role, location, department },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json({ message: "User updated successfully!", user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete
router.delete("/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    res.status(200).json({ message: "User deleted successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
