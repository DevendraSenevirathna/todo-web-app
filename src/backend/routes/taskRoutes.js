const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");

// Base path එක: /api/tasks

// GET /api/tasks (සියලුම Tasks ලබාගැනීමට)
router.get("/", taskController.getAllTasks);

// POST /api/tasks (අලුත් Task එකක් එකතු කිරීමට)
router.post("/", taskController.createTask);

module.exports = router;