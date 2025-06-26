// API لإدارة إعدادات الموقع
export default async function handler(req, res) {
  const backendUrl = process.env.BACKEND_URL || 'http://localhost:4000';

  try {
    if (req.method === 'GET') {
      const response = await fetch(`${backendUrl}/api/site-settings`);
      if (response.ok) {
        const settings = await response.json();
        res.status(200).json(settings);
      } else {
        // إعدادات افتراضية
        res.status(200).json({
          siteTitle: 'Town Media Agent',
          mainColor: '#2563eb',
          bgColor: '#111827',
          welcomeText: 'منصة إدارة الخدمات الذكية للموزعين والع��لاء',
          footerText: `© ${new Date().getFullYear()} Town Media Agent. All rights reserved.`,
          heroImage: '',
        });
      }
    } else if (req.method === 'POST') {
      const response = await fetch(`${backendUrl}/api/site-settings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(req.body),
      });

      if (response.ok) {
        const result = await response.json();
        res.status(200).json(result);
      } else {
        res.status(500).json({ error: 'فشل في حفظ الإعدادات' });
      }
    } else {
      res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Site settings API error:', error);
    if (req.method === 'GET') {
      // إعدادات افتراضية في حالة الخطأ
      res.status(200).json({
        siteTitle: 'Town Media Agent',
        mainColor: '#2563eb',
        bgColor: '#111827',
        welcomeText: 'منصة إدارة الخدمات الذكية للموزعين والعملاء',
        footerText: `© ${new Date().getFullYear()} Town Media Agent. All rights reserved.`,
        heroImage: '',
      });
    } else {
      res.status(500).json({ error: 'خطأ في الخادم' });
    }
  }
}
