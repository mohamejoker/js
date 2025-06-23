# دليل تنظيم المشروع

- جميع المكونات القابلة لإعادة الاستخدام توضع في components/ui
- جميع مكونات التخطيط (layout) توضع في components/layout
- استخدم AdminLayout في صفحات الأدمن
- استخدم Notification.js ودوال الإشعار الموحدة
- استخدم useAdminAuth لحماية صفحات الأدمن
- جميع طلبات API عبر utils/api.js
- جميع النماذج في backend/models، وكل كنترولر في controllers، وكل راوتر في routes
- استخدم ESLint وPrettier للحفاظ على جودة الكود

لإضافة مكون جديد: أنشئ ملف في ui أو layout حسب الحاجة، وصدّره من index.js إن وجد.
