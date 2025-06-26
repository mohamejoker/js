import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import Navigation from '../components/common/Navigation';
import Footer from '../components/common/Footer';
import StatsSection from '../components/ui/StatsSection';

export default function Landing() {
  const router = useRouter();
  const [settings, setSettings] = useState({
    siteTitle: 'Town Media Agent',
    mainColor: '#2563eb',
    bgColor: '#111827',
    welcomeText: 'منصة إدارة الخدمات الذكية للموزعين والعملاء',
    footerText: '',
    heroImage: '',
  });
  const [stats, setStats] = useState([
    { label: 'عدد المستخدمين', value: 0 },
    { label: 'عدد الطلبات', value: 0 },
    { label: 'عدد الخدمات', value: 0 },
    { label: 'إجمالي الرصيد', value: 0 },
  ]);

  useEffect(() => {
    // جلب إعدادات الموقع
    fetch('/api/site-settings')
      .then((res) => res.json())
      .then((data) => setSettings(data))
      .catch((err) => console.error('Error fetching settings:', err));

    // جلب الإحصائيات
    fetch('/api/stats')
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch((err) => console.error('Error fetching stats:', err));
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <>
      <Head>
        <title>{settings.siteTitle}</title>
        <meta name="description" content={settings.welcomeText} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white">
        <Navigation />

        {/* Hero Section */}
        <motion.section
          className="relative min-h-screen flex items-center justify-center px-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="text-center max-w-4xl mx-auto">
            <motion.h1
              className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600"
              variants={itemVariants}
            >
              {settings.siteTitle}
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed"
              variants={itemVariants}
            >
              {settings.welcomeText}
            </motion.p>

            <motion.div
              className="flex flex-col md:flex-row gap-6 justify-center items-center mb-12"
              variants={itemVariants}
            >
              <Link href="/login" className="group">
                <div className="px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-full font-bold text-lg shadow-lg transition-all duration-300 transform hover:scale-105">
                  تسجيل الدخول
                </div>
              </Link>
              <Link href="/register" className="group">
                <div className="px-8 py-4 bg-purple-600 hover:bg-purple-700 rounded-full font-bold text-lg shadow-lg transition-all duration-300 transform hover:scale-105">
                  إنشاء حساب جديد
                </div>
              </Link>
              <Link href="/services" className="group">
                <div className="px-8 py-4 border-2 border-white hover:bg-white hover:text-gray-900 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105">
                  عرض الخدمات
                </div>
              </Link>
            </motion.div>

            <motion.div variants={itemVariants}>
              <StatsSection stats={stats} />
            </motion.div>
          </div>

          {/* Background Animation */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
          </div>
        </motion.section>

        {/* Features Section */}
        <motion.section
          className="py-20 px-4"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-16">لماذا تختار منصتنا؟</h2>

            <div className="grid md:grid-cols-3 gap-8">
              <motion.div
                className="bg-white/10 backdrop-blur-md rounded-xl p-6 text-center hover:bg-white/20 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-4xl mb-4">🚀</div>
                <h3 className="text-xl font-bold mb-3">سرعة وكفاءة</h3>
                <p className="text-gray-300">معالجة سريعة للطلبات وإدارة متقدمة للخدمات</p>
              </motion.div>

              <motion.div
                className="bg-white/10 backdrop-blur-md rounded-xl p-6 text-center hover:bg-white/20 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-4xl mb-4">🔒</div>
                <h3 className="text-xl font-bold mb-3">أمان وموثوقية</h3>
                <p className="text-gray-300">حماية عالية للبيانات ونظام مصادقة متقدم</p>
              </motion.div>

              <motion.div
                className="bg-white/10 backdrop-blur-md rounded-xl p-6 text-center hover:bg-white/20 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-4xl mb-4">📊</div>
                <h3 className="text-xl font-bold mb-3">تحليلات شاملة</h3>
                <p className="text-gray-300">تقارير مفصلة وإحصائيات في الوقت الفعلي</p>
              </motion.div>
            </div>
          </div>
        </motion.section>

        <Footer
          text={
            settings.footerText ||
            `© ${new Date().getFullYear()} ${settings.siteTitle}. جميع الحقوق محفوظة.`
          }
        />
      </div>

      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </>
  );
}
