const mysql = require("mysql2");
require("dotenv").config();

// Connection Pool එකක් භාවිත කිරීම වඩාත් හොඳයි
const db = mysql.createConnection({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "todo_app",
    multipleStatements: true
});

const createTables = `
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS tasks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NULL,
  title VARCHAR(255) NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);`;

const handleConnect = () => {
    db.query(createTables, (err) => {
        if (err) {
            console.error("Failed to setup database tables ❌", err);
            return;
        }
        console.log("Database Tables Ready ✅");
    });
};

db.connect((err) => {
    if (err) {
        console.error("MySQL Connection Failed ❌", err);
        process.exit(1);
    }
    console.log("MySQL Connected ✅");
    handleConnect();
});

module.exports = db;