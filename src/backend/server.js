require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./config/db");

// Routes Imports
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes"); // taskRoutes file

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes); // /api/tasks endpoint

// Base Route
app.get("/", (req, res) => {
    res.send("Backend Server Running 🚀");
});

// Server Port Setup
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});