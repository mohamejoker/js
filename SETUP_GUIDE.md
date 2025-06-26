# 🚀 دليل تشغيل Town Media Agent - SMM Panel

## 📋 ملخص المشروع

**Town Media Agent** هو منصة SMM Panel متكاملة لزيادة المتابعين والتفاعل على جميع منصات التواصل الاجتماعي.

### 🏗️ البنية التقنية

- **Frontend**: Next.js 14 + Tailwind CSS + Framer Motion
- **Backend**: Node.js + Express + SQLite
- **Authentication**: JWT + bcrypt
- **UI/UX**: تصميم متجاوب مع دعم اللغة العربية

---

## 🚀 التشغيل السريع

### الخطوة 1: تشغيل Backend

```bash
cd backend
node server.js
```

### الخطوة 2: تشغيل Frontend (في terminal آخر)

```bash
cd frontend
npm run dev
```

### الخطوة 3: الوصول للتطبيق

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:4000
- **Admin Panel**: http://localhost:3000/admin-panel

---

## 🔐 بيانات الدخول الافتراضية

### Admin Panel

- **المستخدم**: `JokeR`
- **كلمة المرور**: `Jokermedo**1122`

### وصول Backend API مباشر

- **Admin API**: http://localhost:4000/api/admin
- **Public API**: http://localhost:4000/api

---

## 📁 هيكل المشروع المكتمل

```
town-media-agent/
├── frontend/                     # Next.js Frontend
│   ├── pages/
│   │   ├── api/                  # ✅ API Routes (9 ملفات)
│   │   │   ├── stats.js
│   │   │   ├── site-settings.js
│   │   │   ├── users.js
│   │   │   ├── services.js
│   │   │   ├── orders.js
│   │   │   ├── transactions.js
│   │   │   ├── balance/[userId].js
│   │   │   ├── distributor.js
│   │   │   └── fetch-distributor-services.js
│   │   ├── landing.js            # ✅ صفحة هبوط SMM Panel
│   │   ├── services.js           # ✅ عرض الخدمات
│   │   ├── pricing.js            # ✅ صفحة الأسعار
│   │   ├── about.js              # ✅ معلومات الشركة
│   │   ├── contact.js            # ✅ تواصل معنا
│   │   ├── order.js              # ✅ طلب خدمة جديدة
│   │   ├── login.js              # ✅ تسجيل دخول المستخدمين
│   │   ├── register.js           # ✅ تسجيل مستخدمين جدد
│   │   ├── dashboard.js          # ✅ لوحة تحكم المستخدمين
│   │   ├── admin-panel.js        # ✅ لوحة تحكم الأدمن
│   │   ├── manage-services.js    # ✅ إدارة الخدمات
│   │   └── manage-orders.js      # ✅ إدارة الطلبات
│   ├── components/
│   │   ├── common/               # ✅ مكونات مشتركة
│   │   ├── dashboard/            # ✅ مكونات لوحة التحكم
│   │   ├── layout/               # ✅ تخطيطات الصفحات
│   │   └── ui/                   # ✅ مكونات UI
│   └── utils/                    # ✅ أدوات مساعدة
│
├── backend/                      # Node.js Backend
│   ├── routes/
│   │   └── admin.js              # ✅ API routes للأدمن
│   ├── config/                   # ✅ إعدادات قاعدة البيانات
│   ├── models/                   # ✅ نماذج البيانات
│   ├── controllers/              # ✅ معالجات الطلبات
│   ├── middleware/               # ✅ وسطاء المصادقة
│   └── server.js                 # ✅ الخادم الرئيسي
│
├── database.sqlite               # ✅ قاعدة البيانات
├── package.json                  # ✅ إعداد المشروع الجذر
├── start.sh                      # ✅ سكريبت التشغيل
└── README.md                     # ✅ دليل المشروع
```

---

## 🎯 الميزات المكتملة

### 🏠 صفحة الهبوط (Landing Page)

- ✅ تصميم SMM Panel احترافي
- ✅ عرض جميع الخدمات (Instagram, Facebook, YouTube, TikTok, Twitter, Snapchat)
- ✅ أسعار واضحة لكل خدمة
- ✅ شهادات العملاء
- ✅ إحصائيات المنصة
- ✅ تأثيرات بصرية متقدمة

### 🔐 نظام المصادقة

- ✅ تسجيل دخول المستخدمين
- ✅ إنشاء حسابات جديدة
- ✅ تسجيل دخول الأدمن منفصل
- ✅ حماية JWT + bcrypt

### 📊 لوحة تحكم المستخدمين

- ✅ إحصائيات شخصية
- ✅ تاريخ الطلبات
- ✅ طلب خدمات جديدة
- ✅ متابعة حالة الطلبات

### 🛠️ لوحة تحكم الأدمن

- ✅ إحصائيات شاملة
- ✅ إدارة المستخدمين
- ✅ إدارة الخدمات
- ✅ إدارة الطلبات
- ✅ تقارير ومراقبة

### 🛍️ نظام الطلبات

- ✅ طلب خدمات بفئات مختلفة
- ✅ حساب التكلفة تلقائياً
- ✅ تتبع حالة الطلب
- ✅ إدارة كاملة للطلبات

### 🎨 التصميم والواجهة

- ✅ تصميم متجاوب (Mobile-First)
- ✅ دعم اللغة العربية (RTL)
- ✅ تأثيرات بصرية Framer Motion
- ✅ وضع ليلي/نهاري
- ✅ ألوان وتصميم SMM Panel

---

## 🗄️ قاعدة البيانات

### الجداول المنشأة تلقائياً:

1. **users** - المستخدمين والأدمن
2. **services** - الخدمات المتاحة
3. **orders** - الطلبات
4. **transactions** - المعاملات المالية
5. **activity_logs** - سجل الأنشطة

### بيانات تجريبية:

- ✅ أدمن افتراضي (JokeR)
- ✅ خدمات تجريبية لجميع المنصات
- ✅ أسعار واقعية

---

## 🔌 API Endpoints

### للمستخدمين العاديين:

```
GET  /api/services          # جلب الخدمات
POST /api/orders            # إنشاء طلب جديد
GET  /api/orders            # جلب الطلبات
POST /api/users             # تسجيل مستخدم جديد
GET  /api/stats             # إحصائيات عامة
```

### للأدمن:

```
POST /api/admin/login       # تسجيل دخول الأدمن
GET  /api/admin/dashboard   # إحصائيات الأدمن
GET  /api/admin/users       # إدارة المستخدمين
GET  /api/admin/orders      # إدارة الطلبات
GET  /api/admin/services    # إدارة الخدمات
```

---

## 🎨 معرض الصفحات

### الصفحات المكتملة:

1. **الصفحة الرئيسية** (`/landing`) - صفحة هبوط SMM Panel
2. **الخدمات** (`/services`) - عرض جميع الخدمات
3. **الأسعار** (`/pricing`) - تسعير تفصيلي
4. **معلومات عنا** (`/about`) - معلومات الشركة
5. **تواصل معنا** (`/contact`) - نموذج تواصل
6. **طلب خدمة** (`/order`) - إنشاء طلب جديد
7. **لوحة التحكم** (`/dashboard`) - للمستخدمين
8. **الأدمن** (`/admin-panel`) - لوحة الأدمن
9. **تسجيل الدخول** (`/login`) - للمستخدمين
10. **التسجيل** (`/register`) - حسابات جديدة

---

## 🚀 خطوات ما بعد التشغيل

### 1. إضافة خدمات جديدة

- الدخول للوحة الأدمن
- إدارة الخدمات > إضافة خدمة جديدة

### 2. إدارة الطلبات

- مراقبة الطلبات الجديدة
- تحديث حالات الطلبات
- متابعة العملاء

### 3. تخصيص التصميم

- تعديل الألوان في `tailwind.config.js`
- تخصيص النصوص في صفحة الهبوط
- إضافة شعار الشركة

---

## 🛠️ المشاكل الشائعة والحلول

### مشكلة: Backend لا يعمل

```bash
cd backend
npm install
node server.js
```

### مشكلة: Frontend لا يتصل بالـ Backend

- تأكد من أن Backend يعمل على المنفذ 4000
- تحقق من إعدادات CORS في `backend/server.js`

### مشكلة: قاعدة البيانات فارغة

- سيتم إنشاء الجداول والبيانات تلقائياً عند تشغيل Backend
- تحقق من ملف `database.sqlite` في مجلد backend

---

## 📞 الدعم والتطوير

### للحصول على دعم:

1. تحقق من لوجات Backend: `backend/server.log`
2. تحقق من لوجات Frontend في Developer Console
3. مراجعة ملف `README.md` للمزيد من التفاصيل

### للتطوير الإضافي:

- إضافة طرق دفع جديدة
- تكامل مع APIs خارجية
- تحسينات أمنية إضافية
- تقارير متقدمة

---

## ✅ حالة المشروع: **مكتمل 100%**

المشروع جاهز للاستخدام الفوري ويتضمن جميع الميزات المطلوبة لـ SMM Panel احترافي.

**مطور بواسطة**: Town Media Team  
**التاريخ**: ديسمبر 2024  
**الإصدار**: 1.0.0
