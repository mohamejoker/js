#!/bin/bash

echo "🚀 بدء تشغيل Town Media Agent - Full Stack Application"
echo "================================================"

# تثبيت التبعيات إذا لم تكن موجودة
if [ ! -d "node_modules" ]; then
    echo "📦 تثبيت التبعيات الرئيسية..."
    npm install
fi

if [ ! -d "backend/node_modules" ]; then
    echo "📦 تثبيت تبعيات Backend..."
    cd backend && npm install && cd ..
fi

if [ ! -d "frontend/node_modules" ]; then
    echo "📦 تثبيت تبعيات Frontend..."
    cd frontend && npm install && cd ..
fi

echo "✅ تم تثبيت جميع التبعيات"

# إنشاء قاعدة البيانات إذا لم تكن موجودة
if [ ! -f "backend/database.sqlite" ]; then
    echo "🗄️ إنشاء قاعدة البيانات..."
    touch backend/database.sqlite
fi

echo "🖥️ تشغيل Backend Server على المنفذ 4000..."
cd backend && node server.js &
BACKEND_PID=$!
cd ..

sleep 3

echo "🌐 تشغيل Frontend Server على المنفذ 3000..."
cd frontend && npm run dev &
FRONTEND_PID=$!
cd ..

echo "✅ تم تشغيل الخوادم بنجاح!"
echo "📍 Frontend: http://localhost:3000"
echo "📍 Backend: http://localhost:4000"
echo ""
echo "للإيقاف، اضغط Ctrl+C"

# دالة للتنظيف عند الإيقاف
cleanup() {
    echo ""
    echo "🛑 إيقاف الخوادم..."
    kill $BACKEND_PID 2>/dev/null
    kill $FRONTEND_PID 2>/dev/null
    echo "✅ تم إيقاف جميع الخوادم"
    exit 0
}

# تسجيل معالج الإيقاف
trap cleanup SIGINT SIGTERM

# انتظار إلى الأبد
wait
