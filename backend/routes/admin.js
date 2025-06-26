import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import sqlite3 from 'sqlite3';

const router = express.Router();

// اتصال قاعدة البيانات
const db = new sqlite3.Database('./database.sqlite');

// Middleware للمصادقة
const adminAuth = (req, res, next) => {
  const token =
    req.headers.authorization?.split(' ')[1] || req.cookies?.adminToken;

  if (!token) {
    return res.status(401).json({ message: 'غير مصرح - مطلوب توكن' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'SECRET_KEY');
    if (decoded.role !== 'admin') {
      return res.status(403).json({ message: 'صلاحية غير كافية' });
    }
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'توكن غير صالح' });
  }
};

// تسجيل دخول الأدمن
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ message: 'اسم المستخدم وكلمة المرور مطلوبان' });
    }

    db.get(
      'SELECT * FROM users WHERE name = ? AND role = ?',
      [username, 'admin'],
      async (err, user) => {
        if (err) {
          return res.status(500).json({ message: 'خطأ في قاعدة البيانات' });
        }

        if (!user) {
          return res.status(401).json({ message: 'بيانات دخول غير صحيحة' });
        }

        try {
          const validPassword = await bcrypt.compare(password, user.password);
          if (!validPassword) {
            return res.status(401).json({ message: 'بيانات دخول غير صحيحة' });
          }

          const token = jwt.sign(
            { id: user.id, username: user.name, role: user.role },
            process.env.JWT_SECRET || 'SECRET_KEY',
            { expiresIn: '24h' }
          );

          res.cookie('adminToken', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 24 * 60 * 60 * 1000, // 24 ساعة
          });

          res.json({
            message: 'تم تسجيل الدخول بنجاح',
            token,
            user: {
              id: user.id,
              username: user.name,
              email: user.email,
              role: user.role,
            },
          });
        } catch (bcryptError) {
          return res.status(500).json({ message: 'خطأ في التشفير' });
        }
      }
    );
  } catch (error) {
    console.error('Admin login error:', error);
    res.status(500).json({ message: 'خطأ في الخادم' });
  }
});

// تسجيل خروج الأدمن
router.post('/logout', (req, res) => {
  res.clearCookie('adminToken');
  res.json({ message: 'تم تسجيل الخروج بنجاح' });
});

// لوحة تحكم الأدمن - إحصائيات
router.get('/dashboard', adminAuth, (req, res) => {
  Promise.all([
    new Promise((resolve, reject) => {
      db.get('SELECT COUNT(*) as count FROM users', (err, result) => {
        if (err) reject(err);
        else resolve(result.count);
      });
    }),
    new Promise((resolve, reject) => {
      db.get('SELECT COUNT(*) as count FROM orders', (err, result) => {
        if (err) reject(err);
        else resolve(result.count);
      });
    }),
    new Promise((resolve, reject) => {
      db.get('SELECT COUNT(*) as count FROM services', (err, result) => {
        if (err) reject(err);
        else resolve(result.count);
      });
    }),
    new Promise((resolve, reject) => {
      db.get(
        'SELECT SUM(amount) as total FROM transactions WHERE type = "deposit"',
        (err, result) => {
          if (err) reject(err);
          else resolve(result.total || 0);
        }
      );
    }),
  ])
    .then(([usersCount, ordersCount, servicesCount, totalBalance]) => {
      res.json({
        stats: {
          users: usersCount,
          orders: ordersCount,
          services: servicesCount,
          balance: totalBalance,
        },
      });
    })
    .catch((error) => {
      console.error('Dashboard stats error:', error);
      res.status(500).json({ message: 'خطأ في جلب الإحصائيات' });
    });
});

// إدارة المستخدمين
router.get('/users', adminAuth, (req, res) => {
  db.all(
    'SELECT id, name, email, role, created_at FROM users ORDER BY created_at DESC',
    (err, users) => {
      if (err) {
        return res.status(500).json({ message: 'خطأ في جلب المستخدمين' });
      }
      res.json(users);
    }
  );
});

router.post('/users', adminAuth, async (req, res) => {
  try {
    const { name, email, password, role = 'user' } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'جميع الحقول مطلوبة' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    db.run(
      'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
      [name, email, hashedPassword, role],
      function (err) {
        if (err) {
          if (err.code === 'SQLITE_CONSTRAINT') {
            return res
              .status(400)
              .json({ message: 'البريد الإلكتروني مستخدم بالفعل' });
          }
          return res.status(500).json({ message: 'خطأ في إضافة المستخدم' });
        }

        res.status(201).json({
          message: 'تم إضافة المستخدم بنجاح',
          userId: this.lastID,
        });
      }
    );
  } catch (error) {
    console.error('Add user error:', error);
    res.status(500).json({ message: 'خطأ في الخادم' });
  }
});

router.delete('/users/:id', adminAuth, (req, res) => {
  const { id } = req.params;

  db.run('DELETE FROM users WHERE id = ?', [id], function (err) {
    if (err) {
      return res.status(500).json({ message: 'خطأ في حذف المستخدم' });
    }

    if (this.changes === 0) {
      return res.status(404).json({ message: 'المستخدم غير موجود' });
    }

    res.json({ message: 'تم حذف المستخدم بنجاح' });
  });
});

// إدارة الطلبات
router.get('/orders', adminAuth, (req, res) => {
  db.all(
    `
    SELECT 
      orders.*, 
      users.name as user_name, 
      services.title as service_title 
    FROM orders 
    LEFT JOIN users ON orders.user_id = users.id 
    LEFT JOIN services ON orders.service_id = services.id 
    ORDER BY orders.created_at DESC
  `,
    (err, orders) => {
      if (err) {
        return res.status(500).json({ message: 'خطأ في جلب الطلبات' });
      }
      res.json(orders);
    }
  );
});

router.put('/orders/:id/status', adminAuth, (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const validStatuses = ['pending', 'processing', 'completed', 'cancelled'];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ message: 'حالة غير صالحة' });
  }

  db.run(
    'UPDATE orders SET status = ? WHERE id = ?',
    [status, id],
    function (err) {
      if (err) {
        return res.status(500).json({ message: 'خطأ في تحديث الطلب' });
      }

      if (this.changes === 0) {
        return res.status(404).json({ message: 'الطلب غير موجود' });
      }

      res.json({ message: 'تم تحديث حالة الطلب بنجاح' });
    }
  );
});

// إدارة الخدمات
router.get('/services', adminAuth, (req, res) => {
  db.all('SELECT * FROM services ORDER BY created_at DESC', (err, services) => {
    if (err) {
      return res.status(500).json({ message: 'خطأ في جلب الخدمات' });
    }
    res.json(services);
  });
});

router.post('/services', adminAuth, (req, res) => {
  const { title, description, category, price } = req.body;

  if (!title || !description) {
    return res.status(400).json({ message: 'العنوان والوصف مطلوبان' });
  }

  db.run(
    'INSERT INTO services (title, description, category, price) VALUES (?, ?, ?, ?)',
    [title, description, category, price],
    function (err) {
      if (err) {
        return res.status(500).json({ message: 'خطأ في إضافة الخدمة' });
      }

      res.status(201).json({
        message: 'تم إضافة الخدمة بنجاح',
        serviceId: this.lastID,
      });
    }
  );
});

router.delete('/services/:id', adminAuth, (req, res) => {
  const { id } = req.params;

  db.run('DELETE FROM services WHERE id = ?', [id], function (err) {
    if (err) {
      return res.status(500).json({ message: 'خطأ في حذف الخدمة' });
    }

    if (this.changes === 0) {
      return res.status(404).json({ message: 'الخدمة غير موجودة' });
    }

    res.json({ message: 'تم حذف الخدمة بنجاح' });
  });
});

// إدارة الإعدادات
router.get('/settings', adminAuth, (req, res) => {
  // جلب إعدادات الموقع
  res.json({
    siteName: 'Town Media Agent',
    supportEmail: 'support@townmedia.com',
    apiLimits: {
      daily: 1000,
      hourly: 100,
    },
    maintenance: false,
  });
});

router.put('/settings', adminAuth, (req, res) => {
  // حفظ إعدادات الموقع
  const settings = req.body;

  // هنا يمكن حفظ الإعدادات في قاعدة البيانات

  res.json({ message: 'تم حفظ الإعدادات بنجاح' });
});

// سجل الأنشطة
router.get('/activity-log', adminAuth, (req, res) => {
  // يمكن إضافة جدول للأنشطة لاحقاً
  res.json([
    {
      id: 1,
      action: 'تسجيل دخول مدير',
      user: 'JokeR',
      timestamp: new Date().toISOString(),
      ip: req.ip,
    },
  ]);
});

// تصدير التقارير
router.get('/reports/export', adminAuth, (req, res) => {
  const { type, format } = req.query;

  // يمكن إضافة منطق تصدير التقارير هنا

  res.json({
    message: 'جاري تحضير التقرير...',
    downloadUrl: '/api/admin/downloads/report.csv',
  });
});

export default router;
