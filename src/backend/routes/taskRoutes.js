const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const {
  getTasks,
  createTask,
  updateTask,
  toggleTask,
  deleteTask
} = require("../controllers/taskController");

// Every task route requires a valid JWT
router.use(authMiddleware);

router.get("/", getTasks);
router.post("/", createTask);
router.put("/:id", updateTask);
router.patch("/:id/toggle", toggleTask);
router.delete("/:id", deleteTask);

module.exports = router;
