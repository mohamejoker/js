import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { motion } from 'framer-motion';

export default function AdminLogin() {
  const router = useRouter();
  const [loginData, setLoginData] = useState({
    username: '',
    password: '',
    rememberMe: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    // إذا كان المستخدم مسجل الدخول بالفعل، توجيهه للوحة التحكم
    const token = localStorage.getItem('adminToken');
    if (token) {
      router.push('/admin');
    }
  }, [router]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:4000/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: loginData.username,
          password: loginData.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('adminToken', data.token);
        if (loginData.rememberMe) {
          localStorage.setItem('rememberAdmin', 'true');
        }
        router.push('/admin');
      } else {
        setError(data.message || 'فشل في تسجيل الدخول');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('خطأ في الاتصال بالخادم');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setLoginData({
      ...loginData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  return (
    <>
      <Head>
        <title>تسجيل دخول الأدمن - Town Media Agent</title>
        <meta name="description" content="لوحة تحكم الأدمن - Town Media Agent" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center p-4">
        {/* Background Animation */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-2000"></div>
        </div>

        <motion.div
          className="relative z-10 w-full max-w-md"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Logo and Header */}
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="mx-auto w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-4 shadow-xl">
              <span className="text-white text-3xl font-bold">T</span>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Admin Panel</h1>
            <p className="text-blue-200">Town Media Agent</p>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto mt-4 rounded-full"></div>
          </motion.div>

          {/* Login Form */}
          <motion.div
            className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/20"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
          >
            <form onSubmit={handleLogin} className="space-y-6">
              {error && (
                <motion.div
                  className="bg-red-500/20 border border-red-500/50 text-red-100 px-4 py-3 rounded-lg text-center"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  ⚠️ {error}
                </motion.div>
              )}

              <div>
                <label className="block text-white text-sm font-medium mb-3">اسم المستخدم</label>
                <div className="relative">
                  <input
                    type="text"
                    name="username"
                    required
                    value={loginData.username}
                    onChange={handleChange}
                    className="w-full px-4 py-3 pl-12 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    placeholder="أدخل اسم المستخدم"
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-300 text-lg">👤</span>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-white text-sm font-medium mb-3">كلمة المرور</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    required
                    value={loginData.password}
                    onChange={handleChange}
                    className="w-full px-4 py-3 pl-12 pr-12 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    placeholder="أدخل كلمة المرور"
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-300 text-lg">🔒</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-300 hover:text-white transition-colors"
                  >
                    <span className="text-lg">{showPassword ? '🙈' : '👁️'}</span>
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center text-white text-sm">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={loginData.rememberMe}
                    onChange={handleChange}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 focus:ring-2 bg-white/20 border-white/30"
                  />
                  <span className="mr-2">تذكرني</span>
                </label>
                <a href="#" className="text-blue-300 hover:text-blue-200 text-sm transition-colors">
                  نسيت كلمة المرور؟
                </a>
              </div>

              <motion.button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 transition-all duration-300 shadow-lg"
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    جاري تسجيل الدخول...
                  </div>
                ) : (
                  <span className="flex items-center justify-center">
                    <span className="mr-2">🚀</span>
                    تسجيل الدخول
                  </span>
                )}
              </motion.button>
            </form>

            {/* Default Credentials */}
            <motion.div
              className="mt-6 p-4 bg-blue-500/20 border border-blue-500/30 rounded-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <h4 className="text-white font-medium mb-2 text-center">
                🔑 بيانات الدخول الافتراضية
              </h4>
              <div className="space-y-1 text-blue-100 text-sm text-center">
                <p>
                  <strong>المستخدم:</strong> JokeR
                </p>
                <p>
                  <strong>كلمة المرور:</strong> Jokermedo**1122
                </p>
              </div>
              <div className="flex gap-2 mt-3">
                <motion.button
                  type="button"
                  onClick={() => setLoginData({ ...loginData, username: 'JokeR' })}
                  className="flex-1 py-2 px-3 bg-white/20 hover:bg-white/30 text-white text-xs rounded-md transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  ملء اسم المستخدم
                </motion.button>
                <motion.button
                  type="button"
                  onClick={() => setLoginData({ ...loginData, password: 'Jokermedo**1122' })}
                  className="flex-1 py-2 px-3 bg-white/20 hover:bg-white/30 text-white text-xs rounded-md transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  ملء كلمة المرور
                </motion.button>
              </div>
            </motion.div>

            {/* Security Notice */}
            <motion.div
              className="mt-4 text-center text-blue-200 text-xs"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <p className="flex items-center justify-center">
                <span className="mr-1">🔒</span>
                محمي بتشفير SSL
              </p>
            </motion.div>
          </motion.div>

          {/* Footer */}
          <motion.div
            className="text-center mt-6 text-blue-200 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <p>© 2024 Town Media Agent. جميع الحقوق محفوظة.</p>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
}
