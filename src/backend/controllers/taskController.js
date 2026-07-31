const Task = require("../models/Task");

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.findAllByUser(req.user.id);
    res.json({ tasks });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch tasks", error: error.message });
  }
};

exports.createTask = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({ message: "Title is required" });
    }

    const taskId = await Task.create(req.user.id, title.trim(), description || "");
    res.status(201).json({ message: "Task created", taskId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create task", error: error.message });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;

    const existing = await Task.findById(id, req.user.id);
    if (!existing) {
      return res.status(404).json({ message: "Task not found" });
    }

    await Task.update(id, req.user.id, req.body);
    res.json({ message: "Task updated" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update task", error: error.message });
  }
};

exports.toggleTask = async (req, res) => {
  try {
    const { id } = req.params;

    const existing = await Task.findById(id, req.user.id);
    if (!existing) {
      return res.status(404).json({ message: "Task not found" });
    }

    await Task.update(id, req.user.id, { completed: !existing.completed });
    res.json({ message: "Task toggled" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to toggle task", error: error.message });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const existing = await Task.findById(id, req.user.id);
    if (!existing) {
      return res.status(404).json({ message: "Task not found" });
    }

    await Task.delete(id, req.user.id);
    res.json({ message: "Task deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete task", error: error.message });
  }
};
