// API لإدارة إعدادات الموزع
export default async function handler(req, res) {
  const backendUrl = process.env.BACKEND_URL || 'http://localhost:4000';

  try {
    if (req.method === 'GET') {
      const response = await fetch(`${backendUrl}/api/get-distributor`);
      if (response.ok) {
        const distributor = await response.json();
        res.status(200).json(distributor);
      } else {
        res.status(200).json({ apiUrl: '' });
      }
    } else if (req.method === 'POST') {
      const response = await fetch(`${backendUrl}/api/set-distributor`, {
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
        const error = await response.json();
        res.status(response.status).json(error);
      }
    } else {
      res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Distributor API error:', error);
    if (req.method === 'GET') {
      res.status(200).json({ apiUrl: '' });
    } else {
      res.status(500).json({ error: 'خطأ في الخادم' });
    }
  }
}
