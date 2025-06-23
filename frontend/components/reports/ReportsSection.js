import React from 'react';

export default function ReportsSection({ reports }) {
  return (
    <section className="w-full flex flex-col gap-6 items-center justify-center py-10 bg-gray-900 border-t border-gray-800">
      <h2 className="text-2xl font-bold text-blue-400 mb-4">التقارير والإحصائيات</h2>
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6">
        {reports.map((report, i) => (
          <div key={i} className="bg-gray-800 rounded-xl shadow p-6 flex flex-col items-center border border-gray-700">
            <span className="text-lg font-bold text-blue-400 mb-2">{report.title}</span>
            <span className="text-2xl text-green-400 font-bold mb-1">{report.value}</span>
            <span className="text-xs text-gray-400">{report.description}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
