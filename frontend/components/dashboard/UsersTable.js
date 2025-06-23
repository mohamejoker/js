import React from 'react';

export default function UsersTable({ users }) {
  return (
    <div className="bg-gray-800 rounded-xl p-6 shadow">
      <h2 className="text-2xl font-semibold mb-4">المستخدمون</h2>
      <ul>
        {users.map(user => (
          <li key={user.id} className="mb-2 border-b border-gray-700 pb-2">
            <span className="font-bold">{user.name}</span> - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
}
