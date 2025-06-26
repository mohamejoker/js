import express from 'express';
import cors from 'cors';
import sqlite3 from 'sqlite3';
import axios from 'axios';
import fs from 'fs';
import path from 'path';
import multer from 'multer';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import adminRoutes from './routes/admin.js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(
  cors({
    origin:
      process.env.NODE_ENV === 'production'
        ? 'https://your-production-domain.com'
        : 'http://localhost:3000',
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// استخدام routes الأدمن
app.use('/api/admin', adminRoutes);

// إعداد قاعدة البيانات
const db = new sqlite3.Database('./database.sqlite', (err) => {
  if (err) {
    console.error('فشل الاتصال بقاعدة البيانات:', err.message);
  } else {
    console.log('✅ تم الاتصال بقاعدة البيانات SQLite');

    // إنشاء الجداول الأساسية
    db.serialize(() => {
      // جدول المستخدمين
      db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT,
        role TEXT DEFAULT 'user',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )`);

      // جدول الخدمات
      db.run(`CREATE TABLE IF NOT EXISTS services (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT,
        category TEXT,
        price REAL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )`);

      // جدول الطلبات
      db.run(`CREATE TABLE IF NOT EXISTS orders (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        service_id INTEGER,
        quantity INTEGER,
        target_url TEXT,
        notes TEXT,
        status TEXT DEFAULT 'pending',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY(user_id) REFERENCES users(id),
        FOREIGN KEY(service_id) REFERENCES services(id)
      )`);

      // جدول المعاملات المالية
      db.run(`CREATE TABLE IF NOT EXISTS transactions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        amount REAL,
        type TEXT,
        description TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY(user_id) REFERENCES users(id)
      )`);

      // جدول سجل الأنشطة
      db.run(`CREATE TABLE IF NOT EXISTS activity_logs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        action TEXT,
        details TEXT,
        ip_address TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY(user_id) REFERENCES users(id)
      )`);

      // إضافة بيانات تجريبية
      insertSampleData();
    });
  }
});

// دالة إضافة بيانات تجريبية
function insertSampleData() {
  // إنشاء أدمن افتراضي
  const defaultAdmin = {
    username: 'JokeR',
    email: 'admin@townmedia.com',
    password: 'Jokermedo**1122',
    role: 'admin',
  };

  db.get(
    'SELECT * FROM users WHERE name = ? AND role = ?',
    [defaultAdmin.username, 'admin'],
    (err, user) => {
      if (!user && !err) {
        bcrypt.hash(defaultAdmin.password, 10, (err, hash) => {
          if (!err) {
            db.run(
              'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
              [
                defaultAdmin.username,
                defaultAdmin.email,
                hash,
                defaultAdmin.role,
              ],
              (err) => {
                if (!err) {
                  console.log('✅ تم إنشاء الأدمن الافتراضي: JokeR');
                }
              }
            );
          }
        });
      }
    }
  );

  // إضافة خدمات تجريبية
  const sampleServices = [
    {
      title: 'متابعين إنستقرام عرب',
      description: 'متابعين حقيقيين عرب نشطين | السعر: 5 | متوفر: true',
      category: 'Instagram',
      price: 5,
    },
    {
      title: 'إعجابات إنستقرام',
      description: 'إعجابات سريعة وآمنة | السعر: 2 | متوفر: true',
      category: 'Instagram',
      price: 2,
    },
    {
      title: 'متابعين فيسبوك',
      description: 'متابعين صفحة فيسبوك | السعر: 4 | متوفر: true',
      category: 'Facebook',
      price: 4,
    },
    {
      title: 'مشتركين يوتيوب',
      description: 'مشتركين حقيقيين للقناة | ��لسعر: 15 | متوفر: true',
      category: 'YouTube',
      price: 15,
    },
    {
      title: 'متابعين تيك توك',
      description: 'متابعين تيك توك نشطين | السعر: 6 | متوفر: true',
      category: 'TikTok',
      price: 6,
    },
  ];

  sampleServices.forEach((service) => {
    db.get(
      'SELECT * FROM services WHERE title = ?',
      [service.title],
      (err, existing) => {
        if (!existing && !err) {
          db.run(
            'INSERT INTO services (title, description, category, price) VALUES (?, ?, ?, ?)',
            [
              service.title,
              service.description,
              service.category,
              service.price,
            ]
          );
        }
      }
    );
  });
}

// نقاط API العامة (للمستخدمين)

// اختبار API
app.get('/api', (req, res) => {
  res.json({
    message: 'Town Media Agent API يعمل بنجاح! 🚀',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
  });
});

// CRUD للمستخدمين (عام)
app.get('/api/users', (req, res) => {
  db.all(
    'SELECT id, name, email, role, created_at FROM users WHERE role != "admin"',
    [],
    (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(rows);
    }
  );
});

app.post('/api/users', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ error: 'Name, email and password are required' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    db.run(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      [name, email, hashedPassword],
      function (err) {
        if (err) {
          if (err.code === 'SQLITE_CONSTRAINT') {
            return res
              .status(400)
              .json({ error: 'البريد الإلكتروني مستخدم بالفعل' });
          }
          return res.status(500).json({ error: err.message });
        }
        res.json({ id: this.lastID, name, email });
      }
    );
  } catch (error) {
    res.status(500).json({ error: 'خطأ في تشفير كلمة المرور' });
  }
});

// CRUD للخدمات (عام - للقراءة فقط)
app.get('/api/services', (req, res) => {
  db.all('SELECT * FROM services ORDER BY created_at DESC', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// CRUD للطلبات (عام)
app.get('/api/orders', (req, res) => {
  db.all(
    `SELECT orders.*, users.name as user_name, services.title as service_title 
    FROM orders 
    LEFT JOIN users ON orders.user_id = users.id 
    LEFT JOIN services ON orders.service_id = services.id 
    ORDER BY orders.created_at DESC`,
    [],
    (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(rows);
    }
  );
});

app.post('/api/orders', (req, res) => {
  const { user_id, service_id, quantity, target_url, notes } = req.body;
  if (!user_id || !service_id || !quantity) {
    return res.status(400).json({ error: 'جميع الحقول مطلوبة' });
  }

  db.run(
    'INSERT INTO orders (user_id, service_id, quantity, target_url, notes) VALUES (?, ?, ?, ?, ?)',
    [user_id, service_id, quantity, target_url, notes],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({
        id: this.lastID,
        user_id,
        service_id,
        quantity,
        target_url,
        notes,
        status: 'pending',
      });
    }
  );
});

// إعدادات الموقع
app.get('/api/site-settings', (req, res) => {
  const configPath = path.join(__dirname, 'config', 'site-settings.json');
  if (fs.existsSync(configPath)) {
    const settings = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
    res.json(settings);
  } else {
    res.json({
      siteTitle: 'Town Media Agent',
      mainColor: '#2563eb',
      bgColor: '#111827',
      welcomeText: 'أفضل موقع لزيادة المتابعين والمشاهدات',
      footerText: `© ${new Date().getFullYear()} Town Media Agent. جميع الحقوق محفوظة.`,
      heroImage: '',
    });
  }
});

app.post('/api/site-settings', (req, res) => {
  const configDir = path.join(__dirname, 'config');
  const configPath = path.join(configDir, 'site-settings.json');

  if (!fs.existsSync(configDir)) {
    fs.mkdirSync(configDir, { recursive: true });
  }

  fs.writeFileSync(configPath, JSON.stringify(req.body, null, 2));
  res.json({ message: 'تم حفظ الإعدادات بنجاح' });
});

// رفع الملفات
const upload = multer({ dest: path.join(__dirname, 'uploads') });

app.post('/api/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'لم يتم رفع ملف' });
  }

  const fileUrl = `/uploads/${req.file.filename}`;
  res.json({ url: fileUrl });
});

// تقديم الملفات المرفوعة
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// معالجة الأخطاء
app.use((error, req, res, next) => {
  console.error('Server Error:', error);
  res.status(500).json({
    error: 'خطأ في الخادم',
    message:
      process.env.NODE_ENV === 'development'
        ? error.message
        : 'Internal Server Error',
  });
});

// معالجة الطرق غير الموجودة
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'الطريق غير موجود',
    path: req.originalUrl,
  });
});

// تشغيل الخادم
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📊 Admin Panel: http://localhost:${PORT}/api/admin`);
  console.log(`🗄️ Database: SQLite`);
  console.log(`🔐 Default Admin: JokeR / Jokermedo**1122`);
});

// إنهاء العملية بشكل صحيح
process.on('SIGINT', () => {
  console.log('\n🛑 إيقاف الخادم...');
  db.close((err) => {
    if (err) {
      console.error('خطأ في إغلاق قاعدة البيانات:', err.message);
    } else {
      console.log('✅ تم إغلاق قاعدة البيانات');
    }
    process.exit(0);
  });
});

export default app;
