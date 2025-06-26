# Town Media Agent - Full Stack Application

منصة إدارة الخدمات الذكية للموزعين والعملاء

## 🏗️ البنية التقنية

### Frontend

- **Framework**: Next.js 14
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **State Management**: React Hooks
- **Language Support**: Next-i18next (Arabic/English)

### Backend

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: SQLite
- **Authentication**: JWT + bcrypt
- **API**: RESTful APIs

## 🚀 التشغيل السريع

### الطريقة الأولى - تشغيل تلقائي

```bash
# تشغيل المشروع بالكامل
./start.sh
```

### الطريقة الثانية - تشغيل يدوي

```bash
# تثبيت التبعيات
npm run install-all

# تشغيل Frontend و Backend معاً
npm run dev

# أو تشغيل كل واحد منفصل:
# Backend (Terminal 1)
cd backend && npm start

# Frontend (Terminal 2)
cd frontend && npm run dev
```

## 📋 المتطلبات

- Node.js 18+
- npm أو yarn
- Git

## 🌐 الروابط

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:4000
- **Database**: SQLite (backend/database.sqlite)

## 📁 هيكل المشروع

```
town-media-agent/
├── frontend/                 # Next.js Frontend
│   ├── pages/               # صفحات التطبيق
│   │   ├── api/            # API Routes
│   │   ├── admin/          # صفحات الأدمن
│   │   └── ...
│   ├── components/         # المكونات المعاد استخدامها
│   │   ├── common/        # مكونات مشتركة
│   │   ├── dashboard/     # مكونات لوحة التحكم
│   │   ├── layout/        # تخطيطات الصفحات
│   │   └── ui/           # مكونات واجهة المستخدم
│   ├── utils/             # أدوات مساعدة
│   └── styles/           # ملفات التنسيق
│
├── backend/                # Node.js Backend
│   ├── src/               # مصدر التطبيق
│   ├── config/           # إعدادات التطبيق
│   ├── models/           # نماذج قاعدة البيانات
│   ├── routes/           # مسارات API
│   ├── controllers/      # معالجات الطلبات
│   └── middleware/       # وسطاء المصادقة
│
└── docs/                  # الوثائق
```

## 🔧 الميزات الرئيسية

### للمستخدمين

- ✅ تسجيل الدخول والتسجيل
- ✅ لوحة تحكم شخصية
- ✅ إدارة الطلبات
- ✅ عرض الخدمات المتاحة
- ✅ تتبع الرصيد والمعاملات
- ✅ واجهة سريعة الاستجابة

### للمدراء

- ✅ لوحة تحكم الأدمن
- ✅ إدارة المستخدمين
- ✅ إدارة الخدمات
- ✅ إدارة الطلبات
- ✅ التقارير والإحصائيات
- ✅ إعدادات الموقع

### التقنية

- ✅ API شامل مع قاعدة بيانات
- ✅ مصادقة آمنة بـ JWT
- ✅ تشفير كلمات المرور
- ✅ واجهة متجاوبة مع الجوال
- ✅ دعم اللغة العربية
- ✅ تأثيرات بصرية متقدمة

## 🔐 المصادقة

### المستخدم الافتراضي للأدمن

- **اسم المستخدم**: JokeR
- **البريد الإلكتروني**: admin@townmedia.com
- **كلمة المرور**: Jokermedo\*\*1122

## 📊 API Endpoints

### المستخدمين

- `GET /api/users` - جلب جميع المستخدمين
- `POST /api/users` - إضافة مستخدم جديد
- `DELETE /api/users/:id` - حذف مستخدم

### الخدمات

- `GET /api/services` - جلب جميع الخدمات
- `POST /api/services` - إضافة خدمة جديدة
- `DELETE /api/services/:id` - حذف خدمة

### الطلبات

- `GET /api/orders` - جلب جميع الطلبات
- `POST /api/orders` - إنشاء طلب جديد
- `PUT /api/orders/:id` - تحديث حالة الطلب

### الإعدادات

- `GET /api/site-settings` - جلب إعدادات الموقع
- `POST /api/site-settings` - حفظ إعدادات الموقع

## 🛠️ التطوير

### إضافة صفحة جديدة

```bash
# في frontend/pages/
touch new-page.js
```

### إضافة API route جديد

```bash
# في frontend/pages/api/
touch new-api.js
```

### إضافة مكون جديد

```bash
# في frontend/components/
touch NewComponent.js
```

## 🐛 المشاكل الشائعة

### المنفذ مستخدم بالفعل

```bash
# قتل العمليات على المنافذ
lsof -ti:3000 | xargs kill -9
lsof -ti:4000 | xargs kill -9
```

### قاعدة البيانات لا تعمل

```bash
# إعادة إنشاء قاعدة البيانات
rm backend/database.sqlite
cd backend && node server.js
```

## 📝 المساهمة

1. Fork المشروع
2. إنشاء branch جديد (`git checkout -b feature/amazing-feature`)
3. Commit التغييرات (`git commit -m 'Add amazing feature'`)
4. Push للـ branch (`git push origin feature/amazing-feature`)
5. فتح Pull Request

## 📄 الترخيص

هذا المشروع مرخص تحت [MIT License](LICENSE)

## 📞 الدعم

للدعم والاستفسارات:

- GitHub Issues
- البريد الإلكتروني: admin@townmedia.com

---

Made with ❤️ by Town Media Team
