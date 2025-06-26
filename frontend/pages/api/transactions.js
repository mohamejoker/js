// API لإدارة المعاملات المالية
export default async function handler(req, res) {
  const backendUrl = process.env.BACKEND_URL || 'http://localhost:4000';

  try {
    if (req.method === 'GET') {
      const { userId } = req.query;
      let endpoint = `${backendUrl}/api/transactions`;
      if (userId) {
        endpoint += `/${userId}`;
      }

      const response = await fetch(endpoint);
      if (response.ok) {
        const transactions = await response.json();
        res.status(200).json(transactions);
      } else {
        res.status(200).json([]); // مصفوفة فارغة إذا فشل الاتصال
      }
    } else if (req.method === 'POST') {
      const response = await fetch(`${backendUrl}/api/transactions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(req.body),
      });

      if (response.ok) {
        const result = await response.json();
        res.status(201).json(result);
      } else {
        const error = await response.json();
        res.status(response.status).json(error);
      }
    } else {
      res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Transactions API error:', error);
    if (req.method === 'GET') {
      res.status(200).json([]);
    } else {
      res.status(500).json({ error: 'خطأ في الخادم' });
    }
  }
}
