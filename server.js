const express = require('express');
const cors = require('cors');
const db = require('./db');
const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Get all tasks
app.get('/tasks', (req, res) => {
  db.all('SELECT * FROM tasks', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Create a task
app.post('/tasks', (req, res) => {
  const { title, date, status } = req.body;
  if (!title || !date || !status) return res.status(400).json({ error: 'Missing fields' });

  const query = 'INSERT INTO tasks (title, date, status) VALUES (?, ?, ?)';
  db.run(query, [title, date, status], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id: this.lastID, title, date, status });
  });
});

// Update a task
app.put('/tasks/:id', (req, res) => {
  const { title, date, status } = req.body;
  const { id } = req.params;

  const query = 'UPDATE tasks SET title = ?, date = ?, status = ? WHERE id = ?';
  db.run(query, [title, date, status, id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: 'Task not found' });
    res.json({ id, title, date, status });
  });
});

// Delete a task
app.delete('/tasks/:id', (req, res) => {
  const { id } = req.params;

  db.run('DELETE FROM tasks WHERE id = ?', [id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: 'Task not found' });
    res.status(204).send();
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
