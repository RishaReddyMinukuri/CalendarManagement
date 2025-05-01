const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('tasks.db');

// Create tasks table if not exists
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      date TEXT NOT NULL,
      status TEXT NOT NULL
    )
  `);
});

module.exports = db;
