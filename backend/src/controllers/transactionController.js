import db from '../models/db.js';

export const getBalance = (req, res) => {
  const { userId } = req.params;
  db.get('SELECT COALESCE(SUM(CASE WHEN type = "deposit" THEN amount WHEN type = "withdraw" THEN -amount ELSE 0 END), 0) as balance FROM transactions WHERE user_id = ?', [userId], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ userId, balance: row.balance });
  });
};

export const getTransactions = (req, res) => {
  const { userId } = req.params;
  db.all('SELECT * FROM transactions WHERE user_id = ? ORDER BY created_at DESC', [userId], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
};

export const addTransaction = (req, res) => {
  const { user_id, amount, type } = req.body;
  if (!user_id || !amount || !type) return res.status(400).json({ error: 'جميع الحقول مطلوبة' });
  db.run('INSERT INTO transactions (user_id, amount, type) VALUES (?, ?, ?)', [user_id, amount, type], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: this.lastID, user_id, amount, type });
  });
};
