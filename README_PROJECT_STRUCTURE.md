# توثيق مشروع SMM Panel (نظام إدارة خدمات السوشيال ميديا)

## الهيكل العام

```
backend/
  config/           # إعدادات الاتصال وقيم البيئة
  controllers/      # منطق كل كيان (admin, order, ...)
  middlewares/      # وسطاء (auth, error, ...)
  models/           # نماذج Mongoose
  routes/           # راوترات منفصلة لكل كيان
  utils/            # أدوات مساعدة
  server.js         # نقطة البداية
  package.json
  .env

frontend/
  components/       # مكونات عامة (Navbar, Notification, ...)
  hooks/            # هوكس مخصصة (useAuth, ...)
  pages/            # صفحات Next.js
  styles/           # ملفات CSS/SCSS
  public/           # ملفات ثابتة
  utils/            # أدوات مساعدة (api, ...)
  package.json
  next.config.js
  tailwind.config.js
```

## خطوات التشغيل

1. إعداد متغيرات البيئة في ملف `.env` للباكند:
   - `MONGO_URI=...`
   - `JWT_SECRET=...`
2. تثبيت الحزم:
   - backend: `npm install`
   - frontend: `npm install`
3. تشغيل الباكند:
   - `npm run dev` أو `nodemon server.js`
4. تشغيل الواجهة:
   - `npm run dev`

## الأدوات المقترحة
- ESLint, Prettier (تنسيق)
- Helmet, morgan (حماية ولوج)
- react-toastify (إشعارات)
- axios (API)
- react-hook-form (نماذج)

## ملاحظات
- جميع منطق الأدمن في backend/models/Admin.js وcontrollers/adminController.js
- حماية جميع نقاط الأدمن عبر middlewares/auth.js
- يمكن حذف backend/models/User.js نهائياً.
- استخدم Notification.js للإشعارات الموحدة في الواجهة.

---

لأي تطوير أو إضافة جديدة، اتبع نفس التنظيم أعلاه.
