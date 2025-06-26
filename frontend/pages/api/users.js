// API لإدارة المستخدمين
export default async function handler(req, res) {
  const backendUrl = process.env.BACKEND_URL || 'http://localhost:4000';

  try {
    if (req.method === 'GET') {
      const response = await fetch(`${backendUrl}/api/users`);
      if (response.ok) {
        const users = await response.json();
        res.status(200).json(users);
      } else {
        res.status(200).json([]); // مصفوفة فارغة إذا فشل الاتصال
      }
    } else if (req.method === 'POST') {
      const response = await fetch(`${backendUrl}/api/users`, {
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
    } else if (req.method === 'DELETE') {
      const { id } = req.query;
      const response = await fetch(`${backendUrl}/api/users/${id}`, {
        method: 'DELETE',
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
    console.error('Users API error:', error);
    if (req.method === 'GET') {
      res.status(200).json([]); // مصفوفة فارغة في حالة الخطأ
    } else {
      res.status(500).json({ error: 'خطأ في الخادم' });
    }
  }
}
