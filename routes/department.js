const express = require("express");
const router = express.Router();
const Department = require("../models/Department");

// Create a department
router.post("/", async (req, res) => {
  try {
    const { name } = req.body;

    const existingDepartment = await Department.findOne({ name });
    if (existingDepartment) {
      return res.status(400).json({ message: "Department already exists." });
    }

    const department = new Department({ name });
    await department.save();

    res.status(201).json({ message: "Department created successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//Read all departments
router.get("/", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const startIndex = (page - 1) * limit;

    const departments = await Department.find().skip(startIndex).limit(limit);
    const totalDepartments = await Department.countDocuments();

    const pagination = {
      currentPage: page,
      totalPages: Math.ceil(totalDepartments / limit),
      totalItems: totalDepartments,
    };

    res.status(200).json({ departments, pagination });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a department
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const existingDepartment = await Department.findById(id);
    if (!existingDepartment) {
      return res.status(404).json({ message: "Department not found." });
    }

    existingDepartment.name = name;
    await existingDepartment.save();

    res.status(200).json({ message: "Department updated successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a department
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const existingDepartment = await Department.findById(id);
    if (!existingDepartment) {
      return res.status(404).json({ message: "Department not found." });
    }

    await existingDepartment.remove();

    res.status(200).json({ message: "Department deleted successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
