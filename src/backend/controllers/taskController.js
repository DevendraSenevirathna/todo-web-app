const db = require("../config/db");

// 1. Get all tasks
exports.getAllTasks = (req, res) => {
    const query = "SELECT * FROM tasks ORDER BY id DESC";
    db.query(query, (err, results) => {
        if (err) {
            console.error("Fetch Error:", err);
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
};

// 2. Create task
exports.createTask = (req, res) => {
    const { title } = req.body;

    if (!title) {
        return res.status(400).json({ message: "Title is required" });
    }

    // user_id එක NULL විදියට insert කරනවා user login වී නැති නිසා
    const query = "INSERT INTO tasks (title, completed, user_id) VALUES (?, ?, NULL)";
    
    db.query(query, [title, false], (err, result) => {
        if (err) {
            console.error("DB Insert Error:", err);
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({
            message: "Task created successfully",
            task: { id: result.insertId, title, completed: false }
        });
    });
};