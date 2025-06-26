# 🚀 Town Media Agent - وكالة التسويق الرقمي

![Town Media Agent](https://img.shields.io/badge/Next.js-14.x-black)
![React](https://img.shields.io/badge/React-18.x-blue)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.x-38bdf8)
![Node.js](https://img.shields.io/badge/Node.js-20.x-green)
![Mobile First](https://img.shields.io/badge/Mobile-First-orange)
![RTL Support](https://img.shields.io/badge/RTL-Support-purple)

منصة تسويق رقمي شاملة ومحسنة للهاتف المحمول تقدم خدمات وسائل التواصل الاجتماعي عالية الجودة.

## ✨ المميزات الرئيسية

### 📱 محسن للهاتف المحمول بالكامل

- **تصميم Mobile-First** مع استجابة كاملة لجميع ��لأجهزة
- **دعم PWA** مع إمكانية التثبيت على الهاتف
- **تحسينات خاصة لـ iOS Safari** و Android Chrome
- **حماية من التمرير المطاطي** على الأجهزة المحمولة
- **Safe Area** دعم للأجهزة مع النوتش

### 🌐 دعم اللغة العربية الكامل

- **RTL Layout** دعم كامل للكتابة من اليمين لليسار
- **خط Cairo** محسن للقراءة العربية
- **الأرقام العربية** مع تنسيق صحيح
- **تواريخ وعملات عربية**

### 🎨 واجهة مستخدم متقدمة

- **Dark Mode** مع انتقال سلس
- **Framer Motion** رسوم متحركة احترافية
- **Glass Morphism** تأثيرات زجاجية حديثة
- **Gradient Designs** تدرجات لونية جميلة
- **Toast Notifications** إشعارات تفاعلية

### 🔧 مكونات محسنة

- **Error Boundary** للتعامل مع الأخطاء
- **Loading States** حالات تحميل متقد��ة
- **Modal System** نوافذ منبثقة احترافية
- **Form Components** عناصر نماذج محسنة
- **Button System** أزرار متنوعة الأنماط

### ⚡ الأداء والسرعة

- **Code Splitting** تقسيم الكود للتحميل السريع
- **Image Optimization** تحسين الصور التلقائي
- **Bundle Analysis** تحليل حجم الحزم
- **Caching Strategy** استراتيجية تخزين مؤقت ذكية
- **Lazy Loading** تحميل كسول للمكونات

## 🏗️ البنية التقنية

### Frontend (Next.js 14)

```
frontend/
├── pages/              # صفحات التطبيق
│   ├── api/           # API Routes
│   ├── admin/         # لوحة الإدارة
│   └── *.js          # الصفحات الرئيسية
├── components/        # المكونات القابلة للإعادة
│   ├── common/       # مكونات مشتركة
│   ├── ui/           # مكونات واجهة المستخدم
│   ├── dashboard/    # مكونات لوحة التحكم
│   └── layout/       # مكونات التخطيط
├── styles/           # ملفات الأنماط
├── utils/            # دوال مساعدة
├── hooks/            # React Hooks مخصصة
└��─ public/           # الملفات العامة
```

### Backend (Node.js + Express)

```
backend/
├── routes/           # مسارات API
├── controllers/      # منطق التحكم
├── models/          # نماذج البيانات
├── middlewares/     # الوسطاء
├── config/          # إعدادات التطبيق
└── server.js        # ملف الخادم الرئيسي
```

## 🚀 التثبيت والتشغيل

### المتطلبات الأساسية

- Node.js 18.x أو أحدث
- npm أو yarn
- Git

### 1. استنساخ المشروع

```bash
git clone <repository-url>
cd town-media-agent
```

### 2. تثبيت الحزم

#### Frontend

```bash
cd frontend
npm install
```

#### Backend

```bash
cd backend
npm install
```

### 3. إعداد المتغيرات البيئية

#### Frontend (.env.local)

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_SITE_URL=http://localhost:3000
BACKEND_URL=http://localhost:8000
```

#### Backend (.env)

```env
PORT=8000
NODE_ENV=development
JWT_SECRET=your-secret-key
DB_PATH=./database.sqlite
```

### 4. تشغيل التطبيق

#### تشغيل تلقائي (الطريقة السريعة)

```bash
# من المجلد الرئيسي
npm start
# أو
./start.sh
```

#### تشغيل يدوي

```bash
# تشغيل Backend
cd backend
npm start

# تشغيل Frontend (نافذة طرفية جديدة)
cd frontend
npm run dev
```

### 5. الوصول للتطبيق

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **Admin Panel**: http://localhost:3000/admin

## 📱 تحسينات الهاتف المحمول

### تحسينات الأداء

- **Critical CSS** للتحميل السريع
- **Resource Preloading** لتحميل الموارد مسبقاً
- **Bundle Splitting** لتقليل وقت التحميل الأولي
- **Image Optimization** مع WebP و AVIF
- **Service Worker** للتخزين المؤقت

### تحسينات التفاعل

- **Touch Gestures** دعم إيماءات اللمس
- **Tap Highlights** تحسين مناطق اللمس
- **Keyboard Navigation** تنقل بالكيبورد
- **Focus Management** إدارة التركيز
- **Screen Reader** دعم قارئات الشاشة

### تحسينات العرض

- **Responsive Breakpoints** نقاط توقف متجاوبة
- **Flexible Typography** خطوط مرنة
- **Adaptive Images** صور متكيفة
- **Safe Areas** مناطق آمنة للعرض
- **Orientation Support** دعم الاتجاهات

## 🔐 الحسابات الافتراضية

### المدير

- **البري�� الإلكتروني**: admin@townmedia.com
- **كلمة المرور**: admin123

### المستخدم

- **البريد الإلكتروني**: user@example.com
- **كلمة المرور**: user123

## 🛠️ الميزات التقنية

### Authentication & Security

- JWT Token Authentication
- Password Hashing with bcrypt
- Protected Routes
- CORS Configuration
- Input Validation
- SQL Injection Protection

### Database

- SQLite for development
- User Management
- Order Tracking
- Service Management
- Transaction History
- Activity Logging

### API Features

- RESTful API Design
- Error Handling
- Request Validation
- Response Caching
- Rate Limiting
- API Documentation

### Mobile PWA Features

- App Install Prompt
- Offline Support
- Push Notifications
- App Shortcuts
- Splash Screen
- Icon Sets

## 📊 هيكل قاعدة البيانات

```sql
-- المستخدمون
users (id, username, email, password, role, balance, created_at)

-- الخدمات
services (id, name, category, price, min_quantity, max_quantity, status)

-- الطلبات
orders (id, user_id, service_id, quantity, link, status, total_price, created_at)

-- المعاملات
transactions (id, user_id, type, amount, status, created_at)

-- سجل الأنشطة
activity_logs (id, user_id, action, details, created_at)
```

## 🎯 الصفحات الرئيسية

### العامة

- **/** - الصفحة الرئيسية (Landing Page)
- **/services** - كتالوج الخدمات
- **/pricing** - صفحة الأسعار
- **/about** - من نحن
- **/contact** - اتصل بنا
- **/login** - تسجيل الدخول
- **/register** - إنشاء حساب

### لوحة المستخدم

- **/dashboard** - لوحة التحكم الشخصية
- **/order** - إنشاء طلب جديد
- **/balance** - الرصيد والمعاملات

### لوحة الإدارة

- **/admin** - لوحة التحكم الإدارية
- **/admin/users** - إدارة المستخدمين
- **/admin/services** - إدارة الخدمات
- **/admin/orders** - إدارة الطلبات
- **/admin/settings** - إعدادات النظام

## 🔧 أوامر التطوير

```bash
# تشغيل وضع التطوير
npm run dev

# بناء للإنتاج
npm run build

# تشغيل الإنتاج
npm start

# فحص الكود
npm run lint

# تنسيق الكود
npm run format

# تشغيل الاختبارات
npm test

# تحليل الحزم
npm run analyze
```

## 📞 الدعم والتواصل

- **البريد الإلكتروني**: info@townmedia.com
- **الهاتف**: +20 100 123 4567
- **واتساب**: [+20 100 123 4567](https://wa.me/201001234567)

## 📄 الترخيص

هذا المشروع محمي بحقوق الطبع والنشر © 2024 Town Media Agent. جميع الحقوق محفوظة.

---

**تم التطوير بـ ❤️ في مصر**

[![Made in Egypt](https://img.shields.io/badge/Made%20in-Egypt-red?style=for-the-badge)](https://en.wikipedia.org/wiki/Egypt)
