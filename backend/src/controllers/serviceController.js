import db from '../models/db.js';

export const getAllServices = (req, res) => {
  db.all('SELECT * FROM services', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
};

export const addService = (req, res) => {
  const { title, description } = req.body;
  if (!title) return res.status(400).json({ error: 'Title is required' });
  db.run('INSERT INTO services (title, description) VALUES (?, ?)', [title, description], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: this.lastID, title, description });
  });
};

export const deleteService = (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM services WHERE id = ?', [id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'تم حذف الخدمة', id });
  });
};
