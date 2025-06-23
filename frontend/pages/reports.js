import React from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import ReportsSection from '../components/reports/ReportsSection';
import withAuth from '../utils/withAuth';

function ReportsPage() {
  // بيانات تقارير افتراضية، يمكن ربطها بـ API لاحقًا
  const reports = [
    { title: 'إجمالي الطلبات', value: 20500, description: 'عدد الطلبات المنفذة' },
    { title: 'إجمالي المستخدمين', value: 1200, description: 'عدد المستخدمين المسجلين' },
    { title: 'إجمالي الخدمات', value: 35, description: 'عدد الخدمات المتاحة' },
    { title: 'إجمالي الرصيد', value: '150,000 ر.س', description: 'إجمالي الرصيد في النظام' },
    { title: 'طلبات اليوم', value: 120, description: 'عدد الطلبات اليوم' },
    { title: 'طلبات قيد التنفيذ', value: 15, description: 'طلبات لم تكتمل بعد' },
    { title: 'طلبات ملغاة', value: 3, description: 'طلبات تم إلغاؤها' },
    { title: 'أعلى خدمة مبيعاً', value: 'انستجرام متابعين', description: 'الخدمة الأكثر طلباً' }
  ];
  return (
    <DashboardLayout user={{ name: 'مشرف' }}>
      <ReportsSection reports={reports} />
    </DashboardLayout>
  );
}

export default withAuth(ReportsPage);
