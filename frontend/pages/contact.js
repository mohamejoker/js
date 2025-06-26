import React, { useState } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import Navigation from '../components/common/Navigation';
import Footer from '../components/common/Footer';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // محاكاة إرسال الرسالة
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 2000);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <Head>
        <title>تواصل معنا - Town Media Agent</title>
        <meta
          name="description"
          content="تواصل مع فريق دعم Town Media Agent. نحن هنا لمساعدتك في جميع استفساراتك حول خدمات السوشيال ميديا"
        />
      </Head>

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navigation />

        <div className="pt-20 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                تواصل معنا
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                نحن هنا لمساعدتك! تواصل معنا لأي استفسار أو طلب دعم
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Information */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
                  <h2 className="text-2xl font-bold mb-6">معلومات التواصل</h2>

                  <div className="space-y-6">
                    <div className="flex items-start space-x-4 space-x-reverse">
                      <div className="bg-white/20 p-3 rounded-lg">
                        <span className="text-2xl">📧</span>
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">البريد الإلكتروني</h3>
                        <p className="text-blue-100">support@townmedia.com</p>
                        <p className="text-blue-100">admin@townmedia.com</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4 space-x-reverse">
                      <div className="bg-white/20 p-3 rounded-lg">
                        <span className="text-2xl">💬</span>
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">واتساب</h3>
                        <p className="text-blue-100">+20 123 456 7890</p>
                        <p className="text-blue-100 text-sm">متاح 24/7</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4 space-x-reverse">
                      <div className="bg-white/20 p-3 rounded-lg">
                        <span className="text-2xl">⚡</span>
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">دعم فوري</h3>
                        <p className="text-blue-100">أقل من 15 دقيقة</p>
                        <p className="text-blue-100 text-sm">متوسط وقت الاستجابة</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4 space-x-reverse">
                      <div className="bg-white/20 p-3 rounded-lg">
                        <span className="text-2xl">🕒</span>
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">أوقات العمل</h3>
                        <p className="text-blue-100">24 ساعة / 7 أيام</p>
                        <p className="text-blue-100 text-sm">دعم متواصل</p>
                      </div>
                    </div>
                  </div>

                  {/* Social Media */}
                  <div className="mt-8 pt-8 border-t border-white/20">
                    <h3 className="font-semibold mb-4">تابعنا على</h3>
                    <div className="flex space-x-4 space-x-reverse">
                      {[
                        { name: 'Instagram', icon: '📷', url: '#' },
                        { name: 'Facebook', icon: '📘', url: '#' },
                        { name: 'Twitter', icon: '🐦', url: '#' },
                        { name: 'YouTube', icon: '📺', url: '#' },
                      ].map((social, index) => (
                        <motion.a
                          key={index}
                          href={social.url}
                          className="bg-white/20 p-3 rounded-lg hover:bg-white/30 transition-colors"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <span className="text-xl">{social.icon}</span>
                        </motion.a>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                {submitted ? (
                  <motion.div
                    className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-2xl p-8 text-center"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                  >
                    <div className="text-6xl mb-4">✅</div>
                    <h3 className="text-2xl font-bold text-green-800 dark:text-green-300 mb-2">
                      تم إرسال رسالتك بنجاح!
                    </h3>
                    <p className="text-green-600 dark:text-green-400 mb-6">
                      سنتواصل معك خلال 24 ساعة
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      إرسال رسالة أخ��ى
                    </button>
                  </motion.div>
                ) : (
                  <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                      أرسل لنا رسالة
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            الاسم الكامل *
                          </label>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            placeholder="أدخل اسمك الكامل"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            البريد الإلكتروني *
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            placeholder="your@email.com"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          موضوع الرسالة *
                        </label>
                        <select
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        >
                          <option value="">اختر موضوع الرسالة</option>
                          <option value="support">دعم تقني</option>
                          <option value="billing">استفسار عن الفواتير</option>
                          <option value="service">استفسار عن الخدمات</option>
                          <option value="complaint">شكوى</option>
                          <option value="suggestion">اقتراح</option>
                          <option value="other">أخرى</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          الرسالة *
                        </label>
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          required
                          rows="5"
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          placeholder="اكتب رسالتك هنا..."
                        />
                      </div>

                      <motion.button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 px-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 transition-all duration-300"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {loading ? (
                          <div className="flex items-center justify-center">
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                            جاري الإرسال...
                          </div>
                        ) : (
                          '📧 إرسال الرسالة'
                        )}
                      </motion.button>
                    </form>
                  </div>
                )}
              </motion.div>
            </div>

            {/* FAQ Section */}
            <motion.div
              className="mt-20"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  الأسئلة الشائعة
                </h2>
                <p className="text-gray-600 dark:text-gray-300">إجابات للأسئلة الأكثر شيوعاً</p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {[
                  {
                    q: 'كم من الوقت يستغرق تنفيذ الطلب؟',
                    a: 'معظم الطلبات تبدأ خلال 5-15 دقيقة وتكتمل خلال 24 ساعة حسب نوع الخدمة والكمية.',
                  },
                  {
                    q: 'هل الخدمات آمنة لحسابي؟',
                    a: 'نعم، جميع خدماتنا آمنة 100% ولا تنتهك شروط المنصات. نستخدم طرق طبيعية لزيادة التفاعل.',
                  },
                  {
                    q: 'ما هي طرق الدفع المتاحة؟',
                    a: 'نقبل الدفع بالفيزا، ماستركارد، فودافون كاش، والتحويل البنكي.',
                  },
                  {
                    q: 'هل يمكنني استرداد المال؟',
                    a: 'نعم، نوفر ضمان استرداد المال خلال 30 يوم في حالة عدم الرضا عن الخدمة.',
                  },
                ].map((faq, index) => (
                  <motion.div
                    key={index}
                    className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-3">{faq.q}</h3>
                    <p className="text-gray-600 dark:text-gray-300">{faq.a}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}
