import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Youtube,
  MessageCircle,
  ArrowUp,
} from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const footerSections = [
    {
      title: 'روابط سريعة',
      links: [
        { href: '/', label: 'الرئيسية' },
        { href: '/services', label: 'الخدمات' },
        { href: '/pricing', label: 'الأسعار' },
        { href: '/about', label: 'من نحن' },
        { href: '/contact', label: 'اتصل بنا' },
      ],
    },
    {
      title: 'خدماتنا',
      links: [
        { href: '/services?category=instagram', label: 'خدمات إنستقرام' },
        { href: '/services?category=facebook', label: 'خدمات فيسبوك' },
        { href: '/services?category=youtube', label: 'خدمات يوتيوب' },
        { href: '/services?category=tiktok', label: 'خدمات تيك توك' },
        { href: '/services?category=twitter', label: 'خدمات تويتر' },
      ],
    },
    {
      title: 'الدعم',
      links: [
        { href: '/faq', label: 'الأسئلة الشائعة' },
        { href: '/terms', label: 'شروط الاستخدام' },
        { href: '/privacy', label: 'سياسة الخصوصية' },
        { href: '/contact', label: 'الدعم الفني' },
      ],
    },
  ];

  const socialLinks = [
    { icon: Facebook, href: '#', color: 'hover:text-blue-600', name: 'Facebook' },
    { icon: Instagram, href: '#', color: 'hover:text-pink-600', name: 'Instagram' },
    { icon: Twitter, href: '#', color: 'hover:text-blue-400', name: 'Twitter' },
    { icon: Linkedin, href: '#', color: 'hover:text-blue-700', name: 'LinkedIn' },
    { icon: Youtube, href: '#', color: 'hover:text-red-600', name: 'YouTube' },
  ];

  const contactInfo = [
    { icon: Phone, text: '+20 100 123 4567', href: 'tel:+201001234567' },
    { icon: Mail, text: 'info@townmedia.com', href: 'mailto:info@townmedia.com' },
    { icon: MapPin, text: 'القاهرة، مصر' },
  ];

  return (
    <footer className="bg-gray-900 text-white relative">
      {/* Wave Effect */}
      <div className="absolute top-0 left-0 right-0 h-20 overflow-hidden">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="relative block w-full h-full"
        >
          <path
            d="M0,0V7.23C0,65.52,268.63,112.77,600,112.77S1200,65.52,1200,7.23V0Z"
            className="fill-white dark:fill-gray-100"
          />
        </svg>
      </div>

      <div className="container mx-auto px-4 pt-24 pb-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
                Town Media Agent
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                وكالة التسويق الرقمي الرائدة في المنطقة. نوفر خدمات تسويقية متميزة لتعزيز حضورك
                الرقمي وزيادة تفاعل جمهورك على جميع منصات التواصل الاجتماعي.
              </p>
            </div>

            {/* Social Links */}
            <div>
              <h4 className="font-semibold mb-3">تابعنا على</h4>
              <div className="flex space-x-4 space-x-reverse">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className={`p-2 bg-gray-800 rounded-full transition-colors ${social.color}`}
                    aria-label={social.name}
                  >
                    <social.icon size={20} />
                  </motion.a>
                ))}
              </div>
            </div>
          </div>

          {/* Links Sections */}
          {footerSections.map((section, index) => (
            <div key={index} className="space-y-4">
              <h4 className="text-lg font-semibold text-white">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      href={link.href}
                      className="text-gray-300 hover:text-white transition-colors text-sm flex items-center group"
                    >
                      <span className="w-2 h-2 bg-blue-500 rounded-full ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">تواصل معنا</h4>
            <div className="space-y-3">
              {contactInfo.map((info, index) => (
                <div key={index} className="flex items-center space-x-3 space-x-reverse">
                  <div className="p-2 bg-gray-800 rounded-lg">
                    <info.icon size={16} className="text-blue-400" />
                  </div>
                  {info.href ? (
                    <a
                      href={info.href}
                      className="text-gray-300 hover:text-white transition-colors text-sm"
                    >
                      {info.text}
                    </a>
                  ) : (
                    <span className="text-gray-300 text-sm">{info.text}</span>
                  )}
                </div>
              ))}
            </div>

            {/* WhatsApp Button */}
            <motion.a
              href="https://wa.me/201001234567"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center space-x-2 space-x-reverse bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium mt-4"
            >
              <MessageCircle size={16} />
              <span>واتساب</span>
            </motion.a>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="text-center md:text-right">
              <p className="text-gray-400 text-sm">© 2024 Town Media Agent. جميع الحقوق محفوظة.</p>
              <p className="text-gray-500 text-xs mt-1">تم التطوير بـ ❤️ في مصر</p>
            </div>

            <div className="flex items-center space-x-6 space-x-reverse">
              <Link
                href="/terms"
                className="text-gray-400 hover:text-white transition-colors text-sm"
              >
                الشروط والأحكام
              </Link>
              <Link
                href="/privacy"
                className="text-gray-400 hover:text-white transition-colors text-sm"
              >
                سياسة الخصوصية
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <motion.button
        onClick={scrollToTop}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-6 left-6 z-40 p-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl transition-shadow"
        aria-label="العودة لأعلى"
      >
        <ArrowUp size={20} />
      </motion.button>
    </footer>
  );
};

export default Footer;
