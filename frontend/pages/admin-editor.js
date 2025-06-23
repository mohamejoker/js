import React, { useEffect, useState } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import Card from '../components/ui/Card';
import withAuth from '../utils/withAuth';

function AdminEditor() {
  const [settings, setSettings] = useState({
    siteTitle: '',
    mainColor: '#2563eb',
    bgColor: '#111827',
    welcomeText: '',
    footerText: '',
    heroImage: ''
  });
  const [imageFile, setImageFile] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('/api/site-settings')
      .then(res => res.json())
      .then(data => setSettings(data));
  }, []);

  const handleChange = e => {
    setSettings({ ...settings, [e.target.name]: e.target.value });
  };

  const handleImageChange = e => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setMessage('');
    let heroImageUrl = settings.heroImage;
    if (imageFile) {
      const formData = new FormData();
      formData.append('image', imageFile);
      const resImg = await fetch('/api/upload-hero-image', {
        method: 'POST',
        body: formData
      });
      const dataImg = await resImg.json();
      if (resImg.ok && dataImg.url) heroImageUrl = dataImg.url;
    }
    const res = await fetch('/api/site-settings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...settings, heroImage: heroImageUrl })
    });
    if (res.ok) setMessage('تم حفظ الإعدادات بنجاح!');
    else setMessage('حدث خطأ أثناء الحفظ');
  };

  return (
    <DashboardLayout user={{ name: 'مشرف' }}>
      <Card className="max-w-lg mx-auto">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <h2 className="text-2xl font-bold mb-2 text-blue-400">محرر إعدادات الموقع</h2>
          <input
            type="text"
            name="siteTitle"
            placeholder="عنوان الموقع"
            value={settings.siteTitle}
            onChange={handleChange}
            className="w-full p-3 rounded bg-gray-700 border border-gray-600 focus:outline-none"
          />
          <input
            type="color"
            name="mainColor"
            value={settings.mainColor}
            onChange={handleChange}
            className="w-full p-3 rounded"
          />
          <input
            type="color"
            name="bgColor"
            value={settings.bgColor}
            onChange={handleChange}
            className="w-full p-3 rounded"
          />
          <input
            type="text"
            name="welcomeText"
            placeholder="نص الترحيب"
            value={settings.welcomeText}
            onChange={handleChange}
            className="w-full p-3 rounded bg-gray-700 border border-gray-600 focus:outline-none"
          />
          <input
            type="text"
            name="footerText"
            placeholder="نص الفوتر"
            value={settings.footerText}
            onChange={handleChange}
            className="w-full p-3 rounded bg-gray-700 border border-gray-600 focus:outline-none"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full"
          />
          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 p-3 rounded font-bold">حفظ الإعدادات</button>
          {message && <div className="mt-2 text-center text-green-400">{message}</div>}
        </form>
        {settings.heroImage && (
          <img src={settings.heroImage} alt="Hero" className="mt-6 rounded shadow max-h-48 mx-auto" />
        )}
      </Card>
    </DashboardLayout>
  );
}

export default withAuth(AdminEditor);
