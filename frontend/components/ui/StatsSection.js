import React from 'react';

export default function StatsSection({ stats }) {
  return (
    <section className="w-full flex flex-wrap gap-6 items-center justify-center py-10 bg-gray-900 border-t border-b border-gray-800">
      {stats.map((stat, i) => (
        <div key={i} className="flex flex-col items-center px-8 py-6 bg-gray-800 rounded-xl shadow text-blue-400 min-w-[120px]">
          <span className="text-2xl font-bold">{stat.value}</span>
          <span className="text-xs text-gray-400 mt-1">{stat.label}</span>
        </div>
      ))}
    </section>
  );
}
