const mysql = require("mysql2");
require("dotenv").config();

const db = mysql.createConnection({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "todo_app",
    multipleStatements: true
});

const createUsersTable = `
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`;

const createTasksTable = `
CREATE TABLE IF NOT EXISTS tasks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  completed BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);`;

const handleConnect = () => {
  db.query(createUsersTable, (err) => {
    if (err) {
      console.error("Failed to create users table ❌", err);
      return;
    }
    console.log("Users table is ready ✅");

    db.query(createTasksTable, (err) => {
      if (err) {
        console.error("Failed to create tasks table ❌", err);
        return;
      }
      console.log("Tasks table is ready ✅");
    });
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
