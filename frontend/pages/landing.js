import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import Navigation from '../components/common/Navigation';
import Footer from '../components/common/Footer';
import AnimatedCounter from '../components/ui/AnimatedCounter';

export default function Landing() {
  const router = useRouter();
  const [activeService, setActiveService] = useState(0);

  const services = [
    {
      platform: 'Instagram',
      icon: '📷',
      color: 'from-pink-500 to-purple-600',
      services: [
        { name: 'متابعين إنستقرام', price: '5', quantity: '1000' },
        { name: 'إعجابات إنستقرام', price: '2', quantity: '1000' },
        { name: 'مشاهدات ريلز', price: '3', quantity: '1000' },
        { name: 'تعليقات إنستقرام', price: '8', quantity: '100' },
      ],
    },
    {
      platform: 'Facebook',
      icon: '📘',
      color: 'from-blue-500 to-blue-700',
      services: [
        { name: 'متابعين فيسبوك', price: '4', quantity: '1000' },
        { name: 'إعجابات المنشورات', price: '2', quantity: '1000' },
        { name: 'مشاركات المنشورات', price: '6', quantity: '500' },
        { name: 'مشاهدات الفيديو', price: '3', quantity: '1000' },
      ],
    },
    {
      platform: 'YouTube',
      icon: '📺',
      color: 'from-red-500 to-red-700',
      services: [
        { name: 'مشتركين يوتيوب', price: '15', quantity: '1000' },
        { name: 'مشاهدات الفيديو', price: '5', quantity: '1000' },
        { name: 'إعجابات الفيديو', price: '8', quantity: '1000' },
        { name: 'تعليقات يوتيوب', price: '12', quantity: '100' },
      ],
    },
    {
      platform: 'TikTok',
      icon: '🎵',
      color: 'from-black to-purple-600',
      services: [
        { name: 'متابعين تيك توك', price: '6', quantity: '1000' },
        { name: 'إعجابات تيك توك', price: '3', quantity: '1000' },
        { name: 'مشاهدات تيك توك', price: '2', quantity: '1000' },
        { name: 'مشاركات تيك توك', price: '8', quantity: '500' },
      ],
    },
    {
      platform: 'Twitter',
      icon: '🐦',
      color: 'from-sky-400 to-blue-600',
      services: [
        { name: 'متابعين تويتر', price: '8', quantity: '1000' },
        { name: 'إعجابات تويتر', price: '4', quantity: '1000' },
        { name: 'إعادة تغريد', price: '6', quantity: '500' },
        { name: 'تعليقات تويتر', price: '10', quantity: '100' },
      ],
    },
    {
      platform: 'Snapchat',
      icon: '👻',
      color: 'from-yellow-400 to-yellow-600',
      services: [
        { name: 'متابعين سناب شات', price: '10', quantity: '1000' },
        { name: 'مشاهدات القصة', price: '5', quantity: '1000' },
        { name: 'نقاط سناب', price: '15', quantity: '10000' },
      ],
    },
  ];

  const testimonials = [
    {
      name: 'أحمد محمد',
      role: 'مؤثر إنستقرام',
      image: '👨‍💼',
      rating: 5,
      text: 'خدمة ممتازة! حصلت على 10,000 متابع حقيقي في أسبوع واحد. جودة عالية وأسعار منافسة.',
    },
    {
      name: 'سارة أحمد',
      role: 'مديرة تسويق',
      image: '👩‍💻',
      rating: 5,
      text: 'أفضل موقع للخدمات الاجتماعية. سرعة في التنفيذ ودعم ممتاز على مدار الساعة.',
    },
    {
      name: 'خالد العلي',
      role: 'صانع محتوى',
      image: '🎬',
      rating: 5,
      text: 'استخدم الموقع منذ شهور. خدمات آمنة ونتائج مذهلة لجميع حساباتي على السوشيال ميديا.',
    },
  ];

  const stats = [
    { label: 'عميل سعيد', value: 50000, suffix: '+' },
    { label: 'خدمة متاحة', value: 300, suffix: '+' },
    { label: 'طلب مكتمل', value: 1000000, suffix: '+' },
    { label: 'معدل الرضا', value: 99, suffix: '%' },
  ];

  return (
    <>
      <Head>
        <title>Town Media Agent - أفضل موقع زيادة متابعين ومشاهدات</title>
        <meta
          name="description"
          content="أفضل موقع لزيادة متابعين إنستقرام، فيسبوك، يوتيوب، تيك توك وجميع منصات التواصل الاجتماعي. خدمات سريعة وآمنة بأفضل الأسعار"
        />
        <meta
          name="keywords"
          content="زيادة متابعين, إنستقرام, فيسبوك, يوتيوب, تيك توك, سوشيال ميديا, SMM Panel"
        />
        <meta property="og:title" content="Town Media Agent - أفضل موقع زيادة متابعين" />
        <meta
          property="og:description"
          content="خدمات زيادة متابعين ومشاهدات لجميع منصات التواصل الاجتماعي"
        />
      </Head>

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navigation />

        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 overflow-hidden">
          {/* Background Animation */}
          <div className="absolute inset-0">
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
            <div className="absolute top-1/3 right-1/3 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
            <div className="absolute bottom-1/4 left-1/2 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-2000"></div>
          </div>

          <div className="relative z-10 text-center text-white px-4 max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-7xl font-bold mb-6">
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Town Media Agent
                </span>
              </h1>
              <h2 className="text-2xl md:text-4xl font-semibold mb-4">
                أفضل موقع لزيادة المتابعين والمشاهدات
              </h2>
              <p className="text-lg md:text-xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed">
                احصل على متابعين حقيقيين وتفاعل أكبر لجميع حساباتك على إنستقرام، فيسبوك، يوتيوب، تيك
                توك وأكثر. خدمات سريعة وآمنة بأفضل الأسعار في السوق العربي
              </p>

              <div className="flex flex-col md:flex-row gap-4 justify-center items-center mb-12">
                <Link href="/register" className="group">
                  <motion.div
                    className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    ابدأ الآن مجاناً 🚀
                  </motion.div>
                </Link>
                <Link href="/services" className="group">
                  <motion.div
                    className="px-8 py-4 border-2 border-white/30 backdrop-blur-md rounded-full font-bold text-lg hover:bg-white/10 transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    عرض الخدمات 👁️
                  </motion.div>
                </Link>
              </div>

              {/* Trust Badges */}
              <div className="flex flex-wrap justify-center items-center gap-6 opacity-80">
                <div className="flex items-center space-x-2 space-x-reverse">
                  <span className="text-2xl">✅</span>
                  <span>خدمات آمنة 100%</span>
                </div>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <span className="text-2xl">⚡</span>
                  <span>تسليم فوري</span>
                </div>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <span className="text-2xl">🔒</span>
                  <span>ضمان الجودة</span>
                </div>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <span className="text-2xl">🎯</span>
                  <span>متابعين حقيقيين</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 bg-white dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                أرقام تتحدث عن نفسها
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                نفخر بثقة آلاف العملاء حول العالم
              </p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">
                    <AnimatedCounter end={stat.value} />
                    {stat.suffix}
                  </div>
                  <div className="text-gray-600 dark:text-gray-300 font-medium">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-20 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                خدماتنا المتميزة
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                جميع خدمات السوشيال ميديا في مكان واحد
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Platform Tabs */}
              <div className="space-y-4">
                {services.map((service, index) => (
                  <motion.button
                    key={index}
                    onClick={() => setActiveService(index)}
                    className={`w-full p-6 rounded-xl text-left transition-all duration-300 ${
                      activeService === index
                        ? 'bg-gradient-to-r ' + service.color + ' text-white shadow-xl'
                        : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white hover:shadow-lg'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center space-x-4 space-x-reverse">
                      <span className="text-3xl">{service.icon}</span>
                      <div>
                        <h3 className="text-xl font-bold">{service.platform}</h3>
                        <p
                          className={`text-sm ${
                            activeService === index
                              ? 'text-white/80'
                              : 'text-gray-600 dark:text-gray-400'
                          }`}
                        >
                          {service.services.length} خدمة متاحة
                        </p>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>

              {/* Service Details */}
              <motion.div
                key={activeService}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center space-x-4 space-x-reverse mb-6">
                  <span className="text-4xl">{services[activeService].icon}</span>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    خدمات {services[activeService].platform}
                  </h3>
                </div>

                <div className="space-y-4">
                  {services[activeService].services.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                    >
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white">{item.name}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          {item.quantity} وحدة
                        </p>
                      </div>
                      <div className="text-left">
                        <div className="text-lg font-bold text-green-600">{item.price} ج.م</div>
                        <Link
                          href={`/order?service=${services[activeService].platform}&type=${item.name}`}
                          className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400"
                        >
                          اطلب الآن ←
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div className="flex items-center space-x-2 space-x-reverse text-blue-700 dark:text-blue-300">
                    <span>💡</span>
                    <span className="font-medium">نصيحة:</span>
                  </div>
                  <p className="text-sm text-blue-600 dark:text-blue-400 mt-1">
                    احصل على خصم 20% عند طلب أكثر من 3 خدمات معاً
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-white dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                لماذا نحن الأفضل؟
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                مميزات فريدة تجعلنا الخيار الأول
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: '⚡',
                  title: 'تسليم فوري',
                  description: 'تبدأ الخدمة خلال دقائق من تأكيد الطلب',
                },
                {
                  icon: '🔒',
                  title: 'آمان مضمون',
                  description: 'جميع الخدمات آمنة ولا تنتهك قوانين المنصات',
                },
                {
                  icon: '👥',
                  title: 'متابعين حقيقيين',
                  description: 'فقط حسابات حقيقية ونشطة بدون بوتات',
                },
                {
                  icon: '💰',
                  title: 'أسعار منافسة',
                  description: 'أفضل الأسعار في السوق العربي مع ضمان الجودة',
                },
                {
                  icon: '🎯',
                  title: 'استهداف دقيق',
                  description: 'نستهدف الجمهور المناسب لمحتواك',
                },
                {
                  icon: '📞',
                  title: 'دعم 24/7',
                  description: 'فريق الدعم متاح على مدار الساعة',
                },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  className="text-center p-6 bg-gray-50 dark:bg-gray-700 rounded-xl hover:shadow-lg transition-all duration-300"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                >
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                ماذا يقول عملاؤنا
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">آراء حقيقية من عملاء راضين</p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                >
                  <div className="flex items-center mb-4">
                    <span className="text-3xl mr-3">{testimonial.image}</span>
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-white">
                        {testimonial.name}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{testimonial.role}</p>
                    </div>
                  </div>

                  <div className="flex mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span key={i} className="text-yellow-400">
                        ⭐
                      </span>
                    ))}
                  </div>

                  <p className="text-gray-700 dark:text-gray-300 italic">"{testimonial.text}"</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
          <div className="max-w-4xl mx-auto text-center px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                جاهز لتنمية حساباتك؟
              </h2>
              <p className="text-xl text-blue-100 mb-8">
                انضم إلى آلاف العملاء الراضين واحصل على نتائج مذهلة اليوم
              </p>

              <div className="flex flex-col md:flex-row gap-4 justify-center">
                <Link href="/register">
                  <motion.div
                    className="px-8 py-4 bg-white text-blue-600 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    ابدأ مجاناً الآن 🎉
                  </motion.div>
                </Link>
                <Link href="/contact">
                  <motion.div
                    className="px-8 py-4 border-2 border-white text-white rounded-full font-bold text-lg hover:bg-white/10 transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    تحدث معنا 💬
                  </motion.div>
                </Link>
              </div>

              <p className="text-blue-100 mt-6">
                ✅ لا حاجة لبطاقة ائتمان • ✅ تجربة مجانية • ✅ دعم فوري
              </p>
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
