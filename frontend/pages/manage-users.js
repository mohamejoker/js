import React, { useEffect, useState } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import UsersTable from '../components/dashboard/UsersTable';
import withAuth from '../utils/withAuth';

function ManageUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('/api/users').then(res => res.json()).then(setUsers);
  }, []);

  return (
    <DashboardLayout user={{ name: 'مشرف' }}>
      <h2 className="text-2xl font-bold text-blue-400 mb-6">إدارة المستخدمين</h2>
      <UsersTable users={users} />
    </DashboardLayout>
  );
}

export default withAuth(ManageUsers);
