import React from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import Navigation from '../components/common/Navigation';
import Footer from '../components/common/Footer';
import AnimatedCounter from '../components/ui/AnimatedCounter';

export default function About() {
  const team = [
    {
      name: 'أحمد المدير',
      role: 'الرئيس التنفيذي',
      image: '👨‍���',
      description: 'خبرة 10 سنوات في التسويق الرقمي',
    },
    {
      name: 'سارة التقني',
      role: 'مديرة التكنولوجيا',
      image: '👩‍💻',
      description: 'متخصصة في أنظمة SMM Panel',
    },
    {
      name: 'خالد التسويق',
      role: 'مدير التسويق',
      image: '🎯',
      description: 'خبير في نمو السوشيال ميديا',
    },
    {
      name: 'مريم الدعم',
      role: 'مديرة خدمة العملاء',
      image: '💬',
      description: 'متاحة 24/7 لخدمة العملاء',
    },
  ];

  const achievements = [
    { number: 50000, label: 'عميل راضٍ', suffix: '+' },
    { number: 1000000, label: 'طلب مكتمل', suffix: '+' },
    { number: 300, label: 'خدمة متاحة', suffix: '+' },
    { number: 5, label: 'سنوات خبرة', suffix: '' },
  ];

  const values = [
    {
      icon: '🎯',
      title: 'الجودة أولاً',
      description: 'نحرص على تقديم أعلى جودة في جميع خدماتنا',
    },
    {
      icon: '⚡',
      title: 'السرعة والكفاءة',
      description: 'تنفيذ سريع ودقيق لجميع الطلبات',
    },
    {
      icon: '🔒',
      title: 'الأمان والثقة',
      description: 'حماية كاملة لبيانات وحسابات عملائنا',
    },
    {
      icon: '🌟',
      title: 'التميز المستمر',
      description: 'نسعى دائماً للتطوير وتحسين خدماتنا',
    },
  ];

  return (
    <>
      <Head>
        <title>من نحن - Town Media Agent</title>
        <meta
          name="description"
          content="تعرف على Town Media Agent، الشركة الرائدة في خدمات السوشيال ميديا والتسويق الرقمي في الوطن العربي"
        />
      </Head>

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navigation />

        {/* Hero Section */}
        <section className="pt-20 pb-16 bg-gradient-to-br from-blue-600 to-purple-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-6">من نحن</h1>
              <p className="text-xl md:text-2xl text-blue-100 leading-relaxed">
                الشركة الرائدة في مجال خدمات السوشيال ميديا والتسويق الرقمي في الوطن العربي. نساعد
                آلاف العملاء على تنمية حضورهم الرقمي بأمان وفعالية.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                  قصتنا
                </h2>
                <div className="space-y-4 text-gray-600 dark:text-gray-300">
                  <p>
                    بدأت <strong>Town Media Agent</strong> في عام 2019 برؤية واضحة: جعل خدمات
                    السوشيال ميديا في متناول الجميع بأسعار عادلة وجودة عالية. منذ ذلك الحين، خدمنا
                    أكثر من 50,000 عميل ونفذنا أكثر من مليون طلب بنجاح.
                  </p>
                  <p>
                    نحن متخصصون في تقديم خدمات زيادة المتابعين، الإعجابات، المشاهدات، والتفاعل لجميع
                    منصات التواصل الاجتماعي الرئيسية مثل إنستقرام، فيسبوك، يوتيوب، تيك توك، وأكثر.
                  </p>
                  <p>
                    فريقنا مكون من خبراء في التسويق الرقمي والتكنولوجيا، ونحن ملتزمون بتقديم أفضل
                    خدمة عملاء ودعم فني على مدار الساعة.
                  </p>
                </div>
              </motion.div>

              <motion.div
                className="relative"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-8 text-white">
                  <div className="text-center">
                    <div className="text-6xl mb-4">🚀</div>
                    <h3 className="text-2xl font-bold mb-4">رؤيتنا</h3>
                    <p className="text-blue-100">
                      أن نكون المنصة الأولى في الوطن العربي لخدمات السوشيال ميديا، ونساعد المبدعين
                      ورجال الأعمال على تحقيق أهدافهم الرقمية.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Achievements Section */}
        <section className="py-20 bg-white dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                إنجازاتنا
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                أرقام حقيقية تعكس ثقة عملائنا
              </p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={index}
                  className="text-center"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">
                    <AnimatedCounter end={achievement.number} />
                    {achievement.suffix}
                  </div>
                  <div className="text-gray-600 dark:text-gray-300 font-medium">
                    {achievement.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                قيمنا ومبادئنا
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                المبادئ التي نؤمن بها ونعمل من خلالها
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                >
                  <div className="text-4xl mb-4">{value.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                فريق العمل
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                الخبراء الذين يقودون نجاحنا
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member, index) => (
                <motion.div
                  key={index}
                  className="text-center bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                >
                  <div className="text-6xl mb-4">{member.image}</div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {member.name}
                  </h3>
                  <p className="text-blue-600 dark:text-blue-400 font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">{member.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-20 bg-white dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                لماذا نحن الخيار الأفضل؟
              </h2>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <div className="space-y-6">
                  {[
                    '✅ خدمات آمنة 100% ومضمونة',
                    '⚡ تسليم فوري خلال دقائق',
                    '🎯 متابعين حقيقيين ونشطين',
                    '💰 أسعار منافسة في السوق',
                    '📞 دعم عملاء 24/7',
                    '🔒 حماية كاملة للخصوصية',
                    '📈 نتائج مضمونة ومرئية',
                    '🌟 تقييمات ممتازة من العملاء',
                  ].map((feature, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center space-x-3 space-x-reverse"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <span className="text-gray-900 dark:text-white font-medium">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                className="relative"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <div className="bg-gradient-to-br from-green-500 to-blue-600 rounded-2xl p-8 text-white text-center">
                  <div className="text-5xl mb-4">🏆</div>
                  <h3 className="text-2xl font-bold mb-4">الأكثر ثقة</h3>
                  <p className="text-green-100 mb-6">
                    أكثر من 50,000 عميل راضٍ يثق بخدماتنا ويوصي بها للآخرين
                  </p>
                  <div className="flex justify-center space-x-2 space-x-reverse">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-2xl">
                        ⭐
                      </span>
                    ))}
                  </div>
                  <p className="text-green-100 mt-2">تقييم 5/5 نجوم</p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
