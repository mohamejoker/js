import express from 'express';
import cors from 'cors';
import sqlite3 from 'sqlite3';
import axios from 'axios';
import fs from 'fs';
import path from 'path';
import multer from 'multer';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { rateLimit } from './rateLimit.js';
import cookieParser from 'cookie-parser';
import * as routers from './routes/index.js';
import connectDB from './config/db.js';

const app = express();
const PORT = process.env.PORT || 4000;

// اتصال بقاعدة البيانات
connectDB();

app.use(cors({
  origin: process.env.NODE_ENV === 'production' ? 'https://your-production-domain.com' : '*',
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use('/api/admin', routers.adminRouter);

// إعداد قاعدة البيانات وفتح الاتصال
const db = new sqlite3.Database('./database.sqlite', (err) => {
  if (err) {
    console.error('فشل الاتصال بقاعدة البيانات:', err.message);
  } else {
    // إنشاء الجداول الأساسية
    db.run(`CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL
    )`);
    db.run(`CREATE TABLE IF NOT EXISTS services (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT
    )`);
    db.run(`CREATE TABLE IF NOT EXISTS orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      service_id INTEGER,
      quantity INTEGER,
      status TEXT DEFAULT 'pending',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY(user_id) REFERENCES users(id),
      FOREIGN KEY(service_id) REFERENCES services(id)
    )`);
    db.run(`CREATE TABLE IF NOT EXISTS transactions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      amount REAL,
      type TEXT, -- deposit/withdraw
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY(user_id) REFERENCES users(id)
    )`);
    db.run(`ALTER TABLE users ADD COLUMN password TEXT`, () => {});
    db.run(`ALTER TABLE users ADD COLUMN role TEXT DEFAULT 'user'`, () => {});
  }
});

// نقطة اختبار
app.get('/api', (req, res) => {
  res.json({ message: 'Backend Node.js API is working with SQLite!' });
});

// CRUD للمستخدمين
app.get('/api/users', (req, res) => {
  db.all('SELECT * FROM users', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.post('/api/users', (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) return res.status(400).json({ error: 'Name and email are required' });
  db.run('INSERT INTO users (name, email) VALUES (?, ?)', [name, email], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: this.lastID, name, email });
  });
});

// حذف مستخدم حسب id
app.delete('/api/users/:id', (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM users WHERE id = ?', [id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'تم حذف المستخدم', id });
  });
});

// CRUD للخدمات
app.get('/api/services', (req, res) => {
  db.all('SELECT * FROM services', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.post('/api/services', (req, res) => {
  const { title, description } = req.body;
  if (!title) return res.status(400).json({ error: 'Title is required' });
  db.run('INSERT INTO services (title, description) VALUES (?, ?)', [title, description], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: this.lastID, title, description });
  });
});

// حذف خدمة حسب id
app.delete('/api/services/:id', (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM services WHERE id = ?', [id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'تم حذف الخدمة', id });
  });
});

// CRUD للطلبات (orders)
app.get('/api/orders', (req, res) => {
  db.all(`SELECT orders.*, users.name as user_name, services.title as service_title FROM orders 
    LEFT JOIN users ON orders.user_id = users.id 
    LEFT JOIN services ON orders.service_id = services.id 
    ORDER BY orders.created_at DESC`, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.post('/api/orders', (req, res) => {
  const { user_id, service_id, quantity } = req.body;
  if (!user_id || !service_id || !quantity) return res.status(400).json({ error: 'جميع الحقول مطلوبة' });
  db.run('INSERT INTO orders (user_id, service_id, quantity) VALUES (?, ?, ?)', [user_id, service_id, quantity], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: this.lastID, user_id, service_id, quantity, status: 'pending' });
  });
});

app.put('/api/orders/:id', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  if (!status) return res.status(400).json({ error: 'Status is required' });
  db.run('UPDATE orders SET status = ? WHERE id = ?', [status, id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'تم تحديث حالة الطلب', id, status });
  });
});

app.get('/api/orders/:id', (req, res) => {
  const { id } = req.params;
  db.get(`SELECT orders.*, users.name as user_name, services.title as service_title FROM orders 
    LEFT JOIN users ON orders.user_id = users.id 
    LEFT JOIN services ON orders.service_id = services.id 
    WHERE orders.id = ?`, [id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(row);
  });
});

// حفظ رابط الموزع في ملف config.json
app.post('/api/set-distributor', (req, res) => {
  const { apiUrl } = req.body;
  if (!apiUrl) return res.status(400).json({ error: 'apiUrl is required' });
  const configPath = path.join(__dirname, 'config.json');
  fs.writeFileSync(configPath, JSON.stringify({ distributorUrl: apiUrl }, null, 2));
  res.json({ message: 'تم حفظ رابط الموزع بنجاح' });
});

// استخدام رابط الموزع من config.json عند جلب الخدمات
app.post('/api/fetch-distributor-services', async (req, res) => {
  try {
    const configPath = path.join(__dirname, 'config.json');
    let distributorUrl = 'https://api.example-distributor.com/services';
    if (fs.existsSync(configPath)) {
      const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
      if (config.distributorUrl) distributorUrl = config.distributorUrl;
    }
    const response = await axios.get(distributorUrl);
    const services = response.data;
    // حفظ الخدمات في قاعدة البيانات
    let inserted = 0;
    for (const service of services) {
      // مثال: service.title, service.price, service.available
      db.run(
        'INSERT OR IGNORE INTO services (title, description) VALUES (?, ?)',
        [service.title, `السعر: ${service.price} | متوفر: ${service.available}`],
        function (err) { if (!err) inserted++; }
      );
    }
    res.json({ message: 'تم جلب الخدمات من الموزع وتخزينها', count: inserted });
  } catch (error) {
    res.status(500).json({ error: 'فشل جلب الخدمات من الموزع', details: error.message });
  }
});

// جلب تلقائي عند تشغيل الخادم
(async () => {
  try {
    const configPath = path.join(__dirname, 'config.json');
    let distributorUrl = 'https://api.example-distributor.com/services';
    if (fs.existsSync(configPath)) {
      const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
      if (config.distributorUrl) distributorUrl = config.distributorUrl;
    }
    const response = await axios.get(distributorUrl);
    const services = response.data;
    for (const service of services) {
      db.run(
        'INSERT OR IGNORE INTO services (title, description) VALUES (?, ?)',
        [service.title, `السعر: ${service.price} | متوفر: ${service.available}`]
      );
    }
    console.log('تم جلب الخدمات من الموزع الخارجي وتخزينها تلقائياً.');
  } catch (error) {
    console.error('فشل جلب الخدمات من الموزع الخارجي:', error.message);
  }
})();

// نقطة نهاية لجلب إعدادات الموقع
app.get('/api/site-settings', (req, res) => {
  const configPath = path.join(__dirname, 'site-settings.json');
  if (fs.existsSync(configPath)) {
    const settings = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
    res.json(settings);
  } else {
    res.json({
      siteTitle: '',
      mainColor: '#2563eb',
      bgColor: '#111827',
      welcomeText: '',
      footerText: ''
    });
  }
});

// نقطة نهاية لحفظ إعدادات الموقع
app.post('/api/site-settings', (req, res) => {
  const configPath = path.join(__dirname, 'site-settings.json');
  fs.writeFileSync(configPath, JSON.stringify(req.body, null, 2));
  res.json({ message: 'تم حفظ الإعدادات بنجاح' });
});

// إعداد التخزين للصور
const upload = multer({ dest: path.join(__dirname, 'public', 'uploads') });

// رفع صورة الهيدر
app.post('/api/upload-hero-image', upload.single('image'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'لم يتم رفع صورة' });
  const url = `/uploads/${req.file.filename}`;
  res.json({ url });
});

// تقديم ملفات الصور من مجلد uploads
app.use('/uploads', express.static(path.join(__dirname, 'public', 'uploads')));

// نقطة نهاية لجلب رابط الموزع الحالي
app.get('/api/get-distributor', (req, res) => {
  const configPath = path.join(__dirname, 'config.json');
  if (fs.existsSync(configPath)) {
    const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
    res.json({ apiUrl: config.distributorUrl || '' });
  } else {
    res.json({ apiUrl: '' });
  }
});

// نقاط نهاية للرصيد والمعاملات المالية
app.get('/api/balance/:userId', (req, res) => {
  const { userId } = req.params;
  db.get('SELECT COALESCE(SUM(CASE WHEN type = "deposit" THEN amount WHEN type = "withdraw" THEN -amount ELSE 0 END), 0) as balance FROM transactions WHERE user_id = ?', [userId], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ userId, balance: row.balance });
  });
});

app.get('/api/transactions/:userId', (req, res) => {
  const { userId } = req.params;
  db.all('SELECT * FROM transactions WHERE user_id = ? ORDER BY created_at DESC', [userId], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.post('/api/transactions', (req, res) => {
  const { user_id, amount, type } = req.body;
  if (!user_id || !amount || !type) return res.status(400).json({ error: 'جميع الحقول مطلوبة' });
  db.run('INSERT INTO transactions (user_id, amount, type) VALUES (?, ?, ?)', [user_id, amount, type], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: this.lastID, user_id, amount, type });
  });
});

// تسجيل أدمن جديد
app.post('/api/register-admin', (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ message: 'جميع الحقول مطلوبة' });
  }
  db.get('SELECT * FROM users WHERE name = ? OR email = ?', [username, email], (err, user) => {
    if (err) return res.status(500).json({ message: 'خطأ في قاعدة البيانات' });
    if (user) return res.status(400).json({ message: 'اسم المستخدم أو البريد الإلكتروني مستخدم بالفعل' });
    // تشفير كلمة المرور
    bcrypt.hash(password, 10, (err, hash) => {
      if (err) return res.status(500).json({ message: 'خطأ في التشفير' });
      db.run('INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)', [username, email, hash, 'admin'], function(err) {
        if (err) return res.status(500).json({ message: 'خطأ أثناء التسجيل' });
        res.json({ message: 'تم تسجيل الأدمن بنجاح' });
      });
    });
  });
});

// تسجيل دخول الأدمن مع JWT في httpOnly cookie
app.post('/api/login-admin', rateLimit, (req, res) => {
  const { username, password } = req.body;
  db.get('SELECT * FROM users WHERE name = ? AND role = ?', [username, 'admin'], (err, user) => {
    if (err || !user) return res.status(401).json({ message: 'بيانات الدخول غير صحيحة' });
    bcrypt.compare(password, user.password, (err, same) => {
      if (!same) return res.status(401).json({ message: 'بيانات الدخول غير صحيحة' });
      // إصدار JWT وRefresh Token
      const token = jwt.sign({ id: user.id, username: user.name, role: user.role }, 'SECRET_KEY', { expiresIn: '15m' });
      const refreshToken = jwt.sign({ id: user.id, username: user.name, role: user.role }, 'REFRESH_SECRET_KEY', { expiresIn: '7d' });
      res.cookie('adminToken', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 15 * 60 * 1000 // 15 دقيقة
      });
      res.cookie('adminRefreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 أيام
      });
      res.json({ user: { id: user.id, username: user.name, role: user.role } });
    });
  });
});

// نقطة نهاية لتجديد التوكن للأدمن
app.post('/api/refresh-admin-token', (req, res) => {
  const refreshToken = req.cookies.adminRefreshToken;
  if (!refreshToken) return res.status(401).json({ message: 'غير مصرح' });
  try {
    const decoded = jwt.verify(refreshToken, 'REFRESH_SECRET_KEY');
    if (decoded.role !== 'admin') return res.status(403).json({ message: 'صلاحية غير كافية' });
    // إصدار توكن جديد
    const newToken = jwt.sign({ id: decoded.id, username: decoded.username, role: decoded.role }, 'SECRET_KEY', { expiresIn: '15m' });
    res.cookie('adminToken', newToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 15 * 60 * 1000
    });
    res.json({ message: 'تم تجديد التوكن بنجاح' });
  } catch {
    res.status(401).json({ message: 'توكن التجديد غير صالح' });
  }
});

// نقطة نهاية لتسجيل الخروج للأدمن (حذف الكوكي)
app.post('/api/logout-admin', (req, res) => {
  res.clearCookie('adminToken');
  res.clearCookie('adminRefreshToken');
  res.json({ message: 'تم تسجيل الخروج بنجاح' });
});

// تحديث ميدل وير حماية صفحات الأدمن لدعم الكوكي
function adminAuth(req, res, next) {
  let token = null;
  // جلب التوكن من الكوكي أو الهيدر
  if (req.cookies && req.cookies.adminToken) {
    token = req.cookies.adminToken;
  } else if (req.headers.authorization) {
    token = req.headers.authorization.split(' ')[1];
  }
  if (!token) return res.status(401).json({ message: 'غير مصرح' });
  try {
    const decoded = jwt.verify(token, 'SECRET_KEY');
    if (decoded.role !== 'admin') return res.status(403).json({ message: 'صلاحية غير كافية' });
    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({ message: 'انتهت الجلسة، يرجى إعادة تسجيل الدخول أو تجديد التوكن' });
  }
}
// مثال حماية endpoint:
app.get('/api/admin-only', adminAuth, (req, res) => {
  res.json({ message: 'مرحبًا بك يا أدمن!' });
});

// إنشاء أدمن افتراضي عند بدء السيرفر إذا لم يكن موجودًا
const defaultAdmin = {
  username: 'JokeR',
  email: 'admin@townmedia.com',
  password: 'Jokermedo**1122',
  role: 'admin'
};
db.get('SELECT * FROM users WHERE name = ?', [defaultAdmin.username], (err, user) => {
  if (!user) {
    bcrypt.hash(defaultAdmin.password, 10, (err, hash) => {
      if (!err) {
        db.run('INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)', [defaultAdmin.username, defaultAdmin.email, hash, defaultAdmin.role]);
        console.log('تم إنشاء الأدمن الافتراضي JokeR');
      }
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
