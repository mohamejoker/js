import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from '../components/common/Navigation';
import Footer from '../components/common/Footer';
import AnimatedCounter from '../components/ui/AnimatedCounter';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import { useToast } from '../components/common/Toast';
import { 
  Play, 
  Star, 
  Shield, 
  Zap, 
  Users, 
  TrendingUp, 
  CheckCircle,
  ArrowRight,
  Instagram,
  Facebook,
  Youtube,
  MessageSquare,
  Heart,
  Eye
} from 'lucide-react';

export default function Landing() {
  const router = useRouter();
  const { success } = useToast();
  const [activeService, setActiveService] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // خدمات المنصات الاجتماعية
  const services = [
    {
      platform: 'Instagram',
      icon: Instagram,
      color: 'from-pink-500 to-purple-600',
      description: 'زيادة المتابعين والتفاعل',
      services: [
        { name: 'متابعين إنستقرام', price: '5', quantity: '1000', icon: Users },
        { name: 'إعجابات إنستقرام', price: '2', quantity: '1000', icon: Heart },
        { name: 'مشاهدات ريلز', price: '3', quantity: '1000', icon: Eye },
        { name: 'تعليقات إنستقرام', price: '8', quantity: '100', icon: MessageSquare },
      ],
    },
    {
      platform: 'Facebook',
      icon: Facebook,
      color: 'from-blue-500 to-blue-700',
      description: 'تعزيز صفحات الفيسبوك',
      services: [
        { name: 'متابعين فيسبوك', price: '4', quantity: '1000', icon: Users },
        { name: 'إعجابات المنشورات', price: '2', quantity: '1000', icon: Heart },
        { name: 'مشاركات المنشورات', price: '6', quantity: '500', icon: TrendingUp },
        { name: 'مشاهدات الفيديو', price: '3', quantity: '1000', icon: Eye },
      ],
    },
    {
      platform: 'YouTube',
      icon: Youtube,
      color: 'from-red-500 to-red-700',
      description: 'نمو قنوات اليوتيوب',
      services: [
        { name: 'مشتركين يوتيوب', price: '15', quantity: '1000', icon: Users },
        { name: 'مشاهدات الفيديو', price: '5', quantity: '1000', icon: Eye },
        { name: 'إعجابات الفيديو', price: '8', quantity: '1000', icon: Heart },
        { name: 'تعليقات يوتيوب', price: '12', quantity: '100', icon: MessageSquare },
      ],
    },
  ];

  // إحصائيات المنصة
  const stats = [
    { number: 50000, label: 'عميل راضي', suffix: '+' },
    { number: 2500000, label: 'طلب مكتمل', suffix: '+' },
    { number: 99, label: 'معدل النجاح', suffix: '%' },
    { number: 24, label: 'دعم فني', suffix: '/7' },
  ];

  // مميزات الخدمة
  const features = [
    {
      icon: Shield,
      title: 'أمان وحماية',
      description: 'جميع خدماتنا آمنة ولا تنتهك قوانين المنصات'
    },
    {
      icon: Zap,
      title: 'سرعة التسليم',
      description: 'نبدأ تنفيذ طلبك خلال دقائق من الطلب'
    },
    {
      icon: Users,
      title: 'جودة عالية',
      description: 'متابعين ومتفاعلين حقيقيين من جميع أنحاء العالم'
    },
    {
      icon: TrendingUp,
      title: 'نتائج مضمونة',
      description: 'ضمان استرداد المال إذا لم تحصل على النتائج المطلوبة'
    }
  ];

  // آراء العملاء
  const testimonials = [
    {
      name: 'أحمد محمد',
      role: 'مؤثر رقمي',
      content: 'خدمة ممتازة وسريعة! زاد عدد متابعيني بشكل طبيعي ومستمر.',
      rating: 5,
      avatar: '👨‍💼'
    },
    {
      name: 'سارة أحمد',
      role: 'صاحبة متجر إلكتروني',
      content: 'أفضل منصة للتسويق الرقمي. النتائج فاقت توقعاتي بكثير!',
      rating: 5,
      avatar: '👩‍💼'
    },
    {
      name: 'محمد علي',
      role: 'منشئ محتوى',
      content: 'دعم فني ممتاز وخدمة عملاء على مدار الساعة. أنصح بشدة!',
      rating: 5,
      avatar: '👨‍🎨'
    }
  ];

  const handleStartOrder = () => {
    success('مرحباً بك! سنوجهك لإنشاء طلب جديد');
    router.push('/register');
  };

  return (
    <>
      <Head>
        <title>Town Media Agent - وكالة التسويق الرقمي الرائدة</title>
        <meta name="description" content="احصل على أفضل خدمات التسويق الرقمي لزيادة متابعيك وتفاعلك على جميع منصات التواصل الاجتماعي" />
        <meta name="keywords" content="تسويق رقمي, إنستقرام, فيسبوك, يوتيوب, متابعين, تفاعل" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-white dark:bg-gray-900 overflow-x-hidden">
        <Navigation />

        {/* Hero Section */}
        <motion.section 
          initial={{ opacity: 0 }}
          animate={{ opacity: isVisible ? 1 : 0 }}
          transition={{ duration: 0.8 }}
          className="relative pt-20 lg:pt-24 pb-16 lg:pb-24 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900"
        >
          {/* Background Effects */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-32 w-80 h-80 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
            <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-gradient-to-r from-pink-400 to-red-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-2000"></div>
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Hero Content */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-center lg:text-right"
              >
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Town Media
                  </span>
                  <br />
                  <span className="text-2xl sm:text-3xl lg:text-4xl text-gray-700 dark:text-gray-300">
                    وكالة التسويق الرقمي
                  </span>
                </h1>
                
                <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto lg:mx-0">
                  نوفر أفضل خدمات التسويق الرق��ي لزيادة متابعيك وتفاعلك على جميع منصات التواصل الاجتماعي 
                  بأسعار تنافسية وجودة عالية مضمونة
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Button
                    onClick={handleStartOrder}
                    size="large"
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold shadow-xl"
                    icon={Play}
                  >
                    ابدأ طلبك الآن
                  </Button>
                  
                  <Button
                    onClick={() => router.push('/services')}
                    variant="outline"
                    size="large"
                    className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-4 text-lg"
                  >
                    استكشف الخدمات
                  </Button>
                </div>
              </motion.div>

              {/* Hero Image/Animation */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="hidden lg:block"
              >
                <div className="relative">
                  <div className="w-full h-96 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
                    <div className="absolute inset-4 bg-white dark:bg-gray-800 rounded-2xl flex items-center justify-center">
                      <div className="text-center space-y-4">
                        <div className="text-6xl animate-bounce">📱</div>
                        <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
                          تسويق ذكي
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300">
                          نتائج مضمونة
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Stats Section */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="py-16 bg-white dark:bg-gray-900"
        >
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 rounded-xl p-6 shadow-lg">
                    <div className="text-3xl lg:text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                      <AnimatedCounter value={stat.number} suffix={stat.suffix} />
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 font-medium">
                      {stat.label}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Services Section */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="py-20 bg-gray-50 dark:bg-gray-800"
        >
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                خدماتنا المميزة
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                نوفر خدمات شاملة لجميع منصات التواصل الاجتماعي لتعزيز حضورك الرقمي
              </p>
            </div>

            {/* Service Platform Tabs */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {services.map((service, index) => (
                <button
                  key={index}
                  onClick={() => setActiveService(index)}
                  className={`flex items-center space-x-3 space-x-reverse px-6 py-3 rounded-xl font-medium transition-all ${
                    activeService === index
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                      : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:shadow-md'
                  }`}
                >
                  <service.icon size={20} />
                  <span>{service.platform}</span>
                </button>
              ))}
            </div>

            {/* Active Service Details */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeService}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="max-w-6xl mx-auto"
              >
                <Card className="p-8 shadow-xl">
                  <div className="text-center mb-8">
                    <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r ${services[activeService].color} mb-4`}>
                      <services[activeService].icon size={40} className="text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      خدمات {services[activeService].platform}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {services[activeService].description}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {services[activeService].services.map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="bg-white dark:bg-gray-700 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
                      >
                        <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 rounded-lg mb-4">
                          <item.icon size={24} className="text-blue-600 dark:text-blue-400" />
                        </div>
                        <h4 className="font-bold text-gray-900 dark:text-white mb-2">
                          {item.name}
                        </h4>
                        <div className="flex items-center justify-between">
                          <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                            ${item.price}
                          </span>
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            {item.quantity}
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <div className="text-center mt-8">
                    <Button
                      onClick={() => router.push('/services')}
                      size="large"
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4"
                      icon={ArrowRight}
                    >
                      عرض جميع خدمات {services[activeService].platform}
                    </Button>
                  </div>
                </Card>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.section>

        {/* Features Section */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="py-20 bg-white dark:bg-gray-900"
        >
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                لماذا تختار Town Media؟
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                نحن نقدم خدمات تسويق رقمي متميزة بمعايير عالية الجودة
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <Card className="p-6 h-full hover:shadow-xl transition-shadow">
                    <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 rounded-full mb-4 mx-auto">
                      <feature.icon size={32} className="text-blue-600 dark:text-blue-400" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {feature.description}
                    </p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Testimonials Section */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="py-20 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900"
        >
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                ماذا يقول عملاؤنا؟
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                آراء حقيقية من عملائنا الراضين
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="p-6 h-full">
                    <div className="flex items-center mb-4">
                      <div className="text-3xl ml-3">{testimonial.avatar}</div>
                      <div>
                        <h4 className="font-bold text-gray-900 dark:text-white">
                          {testimonial.name}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} size={16} className="text-yellow-400 fill-current" />
                      ))}
                    </div>
                    
                    <p className="text-gray-700 dark:text-gray-300 italic">
                      "{testimonial.content}"
                    </p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="py-20 bg-gradient-to-r from-blue-600 to-purple-600"
        >
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              جاهز لتنمية حضورك الرقمي؟
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              انضم إلى آلاف العملاء الراضين واحصل على أفضل خدمات التسويق الرقمي
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={handleStartOrder}
                size="extraLarge"
                variant="secondary"
                className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold"
                icon={Play}
              >
                ابدأ الآن مجاناً
              </Button>
              
              <Button
                onClick={() => router.push('/contact')}
                size="extraLarge"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg"
              >
                تواصل معنا
              </Button>
            </div>
          </div>
        </motion.section>

        <Footer />
      </div>
    </>
  );
}