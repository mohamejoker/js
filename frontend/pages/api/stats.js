// API للحصول على إحصائيات الموقع
export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // استدعاء Backend API
    const backendUrl = process.env.BACKEND_URL || 'http://localhost:4000';

    const [usersRes, ordersRes, servicesRes] = await Promise.all([
      fetch(`${backendUrl}/api/users`).catch(() => ({ json: () => [] })),
      fetch(`${backendUrl}/api/orders`).catch(() => ({ json: () => [] })),
      fetch(`${backendUrl}/api/services`).catch(() => ({ json: () => [] })),
    ]);

    const users = await usersRes.json();
    const orders = await ordersRes.json();
    const services = await servicesRes.json();

    // حساب الإحصائيات
    const stats = [
      { label: 'عدد المستخدمين', value: Array.isArray(users) ? users.length : 0 },
      { label: 'عدد الطلبات', value: Array.isArray(orders) ? orders.length : 0 },
      { label: 'عدد الخدمات', value: Array.isArray(services) ? services.length : 0 },
      { label: 'إجمالي الرصيد', value: 0 }, // سيتم حسابه لاحقاً من المعاملات
    ];

    res.status(200).json(stats);
  } catch (error) {
    console.error('Error fetching stats:', error);
    // إرجاع قيم افتراضية في حالة فشل الاتصال
    const defaultStats = [
      { label: 'عدد المستخدمين', value: 0 },
      { label: 'عدد الطلبات', value: 0 },
      { label: 'عدد الخدمات', value: 0 },
      { label: 'إجمالي الرصيد', value: 0 },
    ];
    res.status(200).json(defaultStats);
  }
}
