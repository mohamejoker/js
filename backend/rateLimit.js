// Middleware لتحديد عدد محاولات تسجيل الدخول
let attempts = {};
const WINDOW = 15 * 60 * 1000; // 15 دقيقة
const MAX_ATTEMPTS = 10;

export function rateLimit(req, res, next) {
  const ip = req.ip;
  const now = Date.now();
  if (!attempts[ip]) attempts[ip] = [];
  attempts[ip] = attempts[ip].filter(ts => now - ts < WINDOW);
  if (attempts[ip].length >= MAX_ATTEMPTS) {
    return res.status(429).json({ message: 'عدد محاولات الدخول كبير جداً. حاول لاحقاً.' });
  }
  attempts[ip].push(now);
  next();
}
