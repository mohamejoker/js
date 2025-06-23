import React from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function notifySuccess(message) {
  toast.success(message, { position: 'top-center', rtl: true });
}

export function notifyError(message) {
  toast.error(message, { position: 'top-center', rtl: true });
}

export function notifyInfo(message) {
  toast.info(message, { position: 'top-center', rtl: true });
}

export default function Notification({ type = 'info', message, onClose }) {
  const colors = {
    success: 'bg-green-100 text-green-800',
    error: 'bg-red-100 text-red-800',
    warning: 'bg-yellow-100 text-yellow-800',
    info: 'bg-blue-100 text-blue-800',
  };
  return (
    <div className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-50 px-4 py-2 rounded shadow ${colors[type] || colors.info}`}
         role="alert">
      <span>{message}</span>
      {onClose && (
        <button onClick={onClose} className="ml-4 text-lg font-bold">×</button>
      )}
    </div>
  );
}
