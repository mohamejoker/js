import React, { useEffect, useState } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import OrdersTable from '../components/dashboard/OrdersTable';
import UsersTable from '../components/dashboard/UsersTable';
import ServicesTable from '../components/dashboard/ServicesTable';
import ReportsSection from '../components/reports/ReportsSection';
import withAuth from '../utils/withAuth';

function Dashboard() {
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [services, setServices] = useState([]);
  const [reports, setReports] = useState([
    { title: 'إجمالي الطلبات', value: 0, description: 'عدد الطلبات المنفذة' },
    { title: 'إجمالي المستخدمين', value: 0, description: 'عدد المستخدمين المسجلين' },
    { title: 'إجمالي الخدمات', value: 0, description: 'عدد الخدمات المتاحة' },
    { title: 'إجمالي الرصيد', value: 0, description: 'إجمالي الرصيد في النظام' }
  ]);

  useEffect(() => {
    fetch('/api/orders').then(res => res.json()).then(setOrders);
    fetch('/api/users').then(res => res.json()).then(setUsers);
    fetch('/api/services').then(res => res.json()).then(setServices);
    fetch('/api/reports').then(res => res.json()).then(setReports);
  }, []);

  return (
    <DashboardLayout user={{ name: 'مشرف' }}>
      <ReportsSection reports={reports} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
        <OrdersTable orders={orders} />
        <UsersTable users={users} />
        <ServicesTable services={services} />
      </div>
    </DashboardLayout>
  );
}

export default withAuth(Dashboard);
