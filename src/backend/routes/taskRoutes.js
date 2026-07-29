const express = require("express");
const router = express.Router();

// GET request
router.get("/", (req, res) => {
    res.json({ message: "Tasks routes working successfully!" });
});

module.exports = router;