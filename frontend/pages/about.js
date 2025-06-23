import React from 'react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col items-center justify-center py-20 px-4" dir="rtl">
      <h1 className="text-4xl font-bold mb-6 text-blue-600">من نحن</h1>
      <p className="max-w-2xl text-lg text-gray-700 mb-4 text-center">
        نحن منصة متخصصة في تقديم خدمات التسويق الرقمي الذكي، نساعد الأفراد والشركات على تنمية حضورهم على وسائل التواصل الاجتماعي من خلال حلول احترافية وسريعة وآمنة. فريقنا يضم خبراء في المجال ويقدم دعمًا متواصلاً على مدار الساعة.
      </p>
      <p className="max-w-2xl text-md text-gray-600 text-center">
        هدفنا هو تمكينك من تحقيق أفضل النتائج بأقل تكلفة وبأعلى جودة، مع ضمان الأمان والخصوصية في كل خطوة.
      </p>
    </div>
  );
}
