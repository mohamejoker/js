import React, { useEffect, useState } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import OrdersTable from '../components/dashboard/OrdersTable';
import withAuth from '../utils/withAuth';

function ManageOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch('/api/orders').then(res => res.json()).then(setOrders);
  }, []);

  return (
    <DashboardLayout user={{ name: 'مشرف' }}>
      <h2 className="text-2xl font-bold text-blue-400 mb-6">إدارة الطلبات</h2>
      <OrdersTable orders={orders} />
    </DashboardLayout>
  );
}

export default withAuth(ManageOrders);
