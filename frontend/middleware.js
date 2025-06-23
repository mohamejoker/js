import { NextResponse } from 'next/server';

export async function middleware(req) {
  // فقط حماية صفحات الأدمن
  if (req.nextUrl.pathname.startsWith('/admin')) {
    // إرسال طلب للتحقق من التوكن عبر API محمي
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}/api/admin-only`, {
      credentials: 'include',
      headers: {
        cookie: req.headers.get('cookie') || '',
      },
    });
    if (res.status === 401) {
      // محاولة تجديد التوكن تلقائيًا
      const refresh = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}/api/refresh-admin-token`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          cookie: req.headers.get('cookie') || '',
        },
      });
      if (refresh.status === 200) {
        // إعادة المحاولة بعد التجديد
        return NextResponse.next();
      } else {
        // إعادة التوجيه لصفحة تسجيل الدخول
        return NextResponse.redirect(new URL('/login-admin', req.url));
      }
    } else if (res.status === 403) {
      return NextResponse.redirect(new URL('/login-admin', req.url));
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
