import { Router } from 'express';
import { getAllUsers, addUser, deleteUser } from '../controllers/userController.js';
import { generateToken } from '../middleware/auth.js';
import db from '../models/db.js';

const router = Router();

router.get('/', getAllUsers);
router.post('/', addUser);
router.delete('/:id', deleteUser);

// تسجيل الدخول
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  db.get('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], (err, user) => {
    if (err || !user) return res.status(401).json({ message: 'بيانات الدخول غير صحيحة' });
    // إضافة role افتراضي إذا لم يوجد
    const role = user.role || (user.username === 'admin' ? 'admin' : 'user');
    const token = generateToken({ id: user.id, username: user.username, role });
    res.json({ token, user: { id: user.id, username: user.username, role } });
  });
});

export default router;
