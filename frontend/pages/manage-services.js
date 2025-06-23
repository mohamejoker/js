import React, { useEffect, useState } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import ServicesTable from '../components/dashboard/ServicesTable';
import withAuth from '../utils/withAuth';

function ManageServices() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetch('/api/services').then(res => res.json()).then(setServices);
  }, []);

  return (
    <DashboardLayout user={{ name: 'مشرف' }}>
      <h2 className="text-2xl font-bold text-blue-400 mb-6">إدارة الخدمات</h2>
      <ServicesTable services={services} />
    </DashboardLayout>
  );
}

export default withAuth(ManageServices);
