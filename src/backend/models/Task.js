const db = require("../config/db");

class Task {
  static findAllByUser(userId) {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM tasks WHERE user_id = ? ORDER BY created_at DESC";
      db.query(query, [userId], (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  }

  static findById(id, userId) {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM tasks WHERE id = ? AND user_id = ? LIMIT 1";
      db.query(query, [id, userId], (err, results) => {
        if (err) return reject(err);
        resolve(results[0] || null);
      });
    });
  }

  static create(userId, title, description = "") {
    return new Promise((resolve, reject) => {
      const query =
        "INSERT INTO tasks (user_id, title, description, completed) VALUES (?, ?, ?, false)";
      db.query(query, [userId, title, description], (err, result) => {
        if (err) return reject(err);
        resolve(result.insertId);
      });
    });
  }

  // fields: { title?, description?, completed? }
  static update(id, userId, fields) {
    return new Promise((resolve, reject) => {
      const allowed = ["title", "description", "completed"];
      const keys = Object.keys(fields).filter((k) => allowed.includes(k));

      if (keys.length === 0) {
        return resolve(0);
      }

      const setClause = keys.map((k) => `${k} = ?`).join(", ");
      const values = keys.map((k) => fields[k]);

      const query = `UPDATE tasks SET ${setClause} WHERE id = ? AND user_id = ?`;
      db.query(query, [...values, id, userId], (err, result) => {
        if (err) return reject(err);
        resolve(result.affectedRows);
      });
    });
  }

  static delete(id, userId) {
    return new Promise((resolve, reject) => {
      const query = "DELETE FROM tasks WHERE id = ? AND user_id = ?";
      db.query(query, [id, userId], (err, result) => {
        if (err) return reject(err);
        resolve(result.affectedRows);
      });
    });
  }
}

module.exports = Task;
