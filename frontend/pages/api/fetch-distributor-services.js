// API لجلب خدمات من الموزع الخارجي
export default async function handler(req, res) {
  const backendUrl = process.env.BACKEND_URL || 'http://localhost:4000';

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const response = await fetch(`${backendUrl}/api/fetch-distributor-services`, {
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
  } catch (error) {
    console.error('Fetch distributor services API error:', error);
    res.status(500).json({ error: 'خطأ في جلب خدمات الموزع' });
  }
}
