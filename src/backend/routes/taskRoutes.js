const express = require("express");

const router = express.Router();



// 1. GET all tasks

router.get("/", (req, res) => {

    res.json([

        { id: 1, title: "Complete DevOps Assignment", description: "Testing and deployment" }

    ]);

});



// 2. POST create task

router.post("/", (req, res) => {

    const { title, description } = req.body;

    res.status(201).json({

        message: "Task created successfully",

        task: { id: Date.now(), title, description }

    });

});



module.exports = router;

