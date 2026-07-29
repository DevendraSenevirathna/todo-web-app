const mysql = require("mysql2");
require("dotenv").config();

const db = mysql.createConnection({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "todo_app",
});

db.connect((err) => {
    if (err) {
        console.error("Connection failed:", err);
        process.exit(1);
    }
    console.log("Connected ✅");

    db.query("ALTER TABLE tasks MODIFY user_id INT NULL", (err) => {
        if (err) {
            console.error("Fix failed:", err);
        } else {
            console.log("Fixed! user_id column is now nullable ✅");
        }
        db.end();
    });
});