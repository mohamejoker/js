import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Navigation from '../components/common/Navigation';
import Hero from '../components/common/Hero';
import Footer from '../components/common/Footer';
import StatsSection from '../components/ui/StatsSection';
import { useRouter } from 'next/router';
import { getAuthToken } from '../utils/auth';

export default function Home() {
  const [settings, setSettings] = useState({
    siteTitle: '',
    mainColor: '#2563eb',
    bgColor: '#111827',
    welcomeText: '',
    footerText: '',
    heroImage: ''
  });
  const [stats, setStats] = useState([
    { label: 'عدد المستخدمين', value: 0 },
    { label: 'عدد الطلبات', value: 0 },
    { label: 'عدد الخدمات', value: 0 },
    { label: 'إجمالي الرصيد', value: 0 }
  ]);
  const router = useRouter();

  useEffect(() => {
    fetch('/api/site-settings')
      .then(res => res.json())
      .then(data => setSettings(data));
    fetch('/api/stats')
      .then(res => res.json())
      .then(data => setStats(data));
  }, []);

  useEffect(() => {
    if (!getAuthToken()) {
      router.replace('/landing');
    } else {
      router.replace('/dashboard');
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      <Navigation />
      <Hero title={settings.siteTitle || 'مرحباً بك في Town Media Agent'} subtitle={settings.welcomeText || 'منصة إدارة الخدمات الذكية للموزعين والعملاء'} image={settings.heroImage} />
      <StatsSection stats={stats} />
      <div className="flex flex-col md:flex-row gap-6 mt-8 justify-center items-center">
        <a href="/services" className="px-8 py-4 rounded-full bg-blue-600 hover:bg-blue-700 text-lg font-bold shadow-lg transition-transform duration-200">عرض الخدمات</a>
        <a href="/dashboard" className="px-8 py-4 rounded-full bg-purple-600 hover:bg-purple-700 text-lg font-bold shadow-lg transition-transform duration-200">لوحة التحكم</a>
        <a href="/reports" className="px-8 py-4 rounded-full bg-green-600 hover:bg-green-700 text-lg font-bold shadow-lg transition-transform duration-200">التقارير</a>
      </div>
      <Footer text={settings.footerText || `© ${new Date().getFullYear()} Town Media Agent. All rights reserved.`} />
    </div>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}