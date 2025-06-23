import db from '../models/db.js';
import fs from 'fs';
import path from 'path';

export const getSiteSettings = (req, res) => {
  const configPath = path.join(process.cwd(), 'backend', 'config', 'site-settings.json');
  if (fs.existsSync(configPath)) {
    const settings = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
    res.json(settings);
  } else {
    res.json({
      siteTitle: '',
      mainColor: '#2563eb',
      bgColor: '#111827',
      welcomeText: '',
      footerText: ''
    });
  }
};

export const saveSiteSettings = (req, res) => {
  const configPath = path.join(process.cwd(), 'backend', 'config', 'site-settings.json');
  fs.writeFileSync(configPath, JSON.stringify(req.body, null, 2));
  res.json({ message: 'تم حفظ الإعدادات بنجاح' });
};
