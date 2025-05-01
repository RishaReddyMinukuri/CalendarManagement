import React, { useEffect, useState } from 'react';
import './App.css';

const API_URL = 'http://localhost:3001/tasks';

function App() {
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({ title: '', date: '', status: 'Pending' });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const res = await fetch(API_URL);
    const data = await res.json();
    setTasks(data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = editId ? 'PUT' : 'POST';
    const url = editId ? `${API_URL}/${editId}` : API_URL;
    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    setForm({ title: '', date: '', status: 'Pending' });
    setEditId(null);
    fetchTasks();
  };

  const handleEdit = (task) => {
    setForm(task);
    setEditId(task.id);
  };

  const handleDelete = async (id) => {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    fetchTasks();
  };

  return (
    <div className="App">
      <h1>📅 Task Calendar</h1>
      <form onSubmit={handleSubmit}>
        <input name="title" placeholder="Task Title" value={form.title} onChange={handleChange} required />
        <input type="date" name="date" value={form.date} onChange={handleChange} required />
        <select name="status" value={form.status} onChange={handleChange}>
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
        </select>
        <button type="submit">{editId ? 'Update' : 'Add'} Task</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>
              <td>{task.title}</td>
              <td>{task.date}</td>
              <td>{task.status}</td>
              <td>
                <button onClick={() => handleEdit(task)}>Edit</button>
                <button onClick={() => handleDelete(task.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
