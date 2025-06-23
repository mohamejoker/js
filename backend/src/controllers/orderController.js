import db from '../models/db.js';

export const getAllOrders = (req, res) => {
  db.all(`SELECT orders.*, users.name as user_name, services.title as service_title FROM orders 
    LEFT JOIN users ON orders.user_id = users.id 
    LEFT JOIN services ON orders.service_id = services.id 
    ORDER BY orders.created_at DESC`, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
};

export const addOrder = (req, res) => {
  const { user_id, service_id, quantity } = req.body;
  if (!user_id || !service_id || !quantity) return res.status(400).json({ error: 'جميع الحقول مطلوبة' });
  db.run('INSERT INTO orders (user_id, service_id, quantity) VALUES (?, ?, ?)', [user_id, service_id, quantity], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: this.lastID, user_id, service_id, quantity, status: 'pending' });
  });
};

export const updateOrderStatus = (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  if (!status) return res.status(400).json({ error: 'Status is required' });
  db.run('UPDATE orders SET status = ? WHERE id = ?', [status, id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'تم تحديث حالة الطلب', id, status });
  });
};

export const getOrderById = (req, res) => {
  const { id } = req.params;
  db.get(`SELECT orders.*, users.name as user_name, services.title as service_title FROM orders 
    LEFT JOIN users ON orders.user_id = users.id 
    LEFT JOIN services ON orders.service_id = services.id 
    WHERE orders.id = ?`, [id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(row);
  });
};
