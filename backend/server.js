const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3001;
const DATA_FILE = path.join(__dirname, 'tasks.json');

app.use(cors());
app.use(express.json());

if (!fs.existsSync(DATA_FILE)) {
  fs.writeFileSync(DATA_FILE, '[]');
}

const readTasks = () => {
  return JSON.parse(fs.readFileSync(DATA_FILE));
};

const writeTasks = (tasks) => {
  fs.writeFileSync(DATA_FILE, JSON.stringify(tasks, null, 2));
};

app.get('/tasks', (req, res) => {
  const tasks = readTasks();
  res.json(tasks);
});

app.post('/tasks', (req, res) => {
  const { title, date, status } = req.body;
  if (!title || !date || !status) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  const tasks = readTasks();
  const newTask = { id: Date.now(), title, date, status };
  tasks.push(newTask);
  writeTasks(tasks);

  res.status(201).json(newTask);
});

app.put('/tasks/:id', (req, res) => {
  const { id } = req.params;
  const { title, date, status } = req.body;

  let tasks = readTasks();
  const index = tasks.findIndex(task => task.id == id);
  if (index === -1) return res.status(404).json({ error: 'Task not found' });

  tasks[index] = { ...tasks[index], title, date, status };
  writeTasks(tasks);
  res.json(tasks[index]);
});

app.delete('/tasks/:id', (req, res) => {
  const { id } = req.params;
  let tasks = readTasks();
  const newTasks = tasks.filter(task => task.id != id);
  if (tasks.length === newTasks.length) {
    return res.status(404).json({ error: 'Task not found' });
  }
  writeTasks(newTasks);
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
