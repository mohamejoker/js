import React from 'react';

export default function FloatingChatAssistant() {
  return (
    <div className="fixed bottom-6 left-6 z-50 bg-blue-700 text-white rounded-full shadow-lg p-4 flex items-center gap-2 cursor-pointer hover:bg-blue-800 transition animate-bounce">
      <span className="text-lg font-bold">مساعدة؟</span>
      <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" fill="#fff" opacity="0.1" />
        <path
          d="M12 17v.01M12 13a2 2 0 1 0-2-2"
          stroke="#fff"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
