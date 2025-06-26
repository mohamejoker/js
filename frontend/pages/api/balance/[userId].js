// API للحصول على رصيد مستخدم محدد
export default async function handler(req, res) {
  const { userId } = req.query;
  const backendUrl = process.env.BACKEND_URL || 'http://localhost:4000';

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const response = await fetch(`${backendUrl}/api/balance/${userId}`);
    if (response.ok) {
      const balance = await response.json();
      res.status(200).json(balance);
    } else {
      res.status(200).json({ userId, balance: 0 }); // رصيد افتراضي
    }
  } catch (error) {
    console.error('Balance API error:', error);
    res.status(200).json({ userId, balance: 0 });
  }
}
