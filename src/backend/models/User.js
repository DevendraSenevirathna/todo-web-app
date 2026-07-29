const db = require("../config/db");

class User {
  static findByEmail(email) {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM users WHERE email = ? LIMIT 1";
      db.query(query, [email], (err, results) => {
        if (err) {
          return reject(err);
        }
        resolve(results[0] || null);
      });
    });
  }

  static create(name, email, password) {
    return new Promise((resolve, reject) => {
      const query = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
      db.query(query, [name, email, password], (err, result) => {
        if (err) {
          return reject(err);
        }
        resolve(result.insertId);
      });
    });
  }
}

module.exports = User;
