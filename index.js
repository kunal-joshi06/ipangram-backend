const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
const authRoutes = require("./routes/auth");
const departmentRoutes = require("./routes/department");
const userRoutes = require("./routes/user");
app.use("/api/auth", authRoutes);
app.use("/api/departments", departmentRoutes);
app.use("/api/user", userRoutes);

mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
