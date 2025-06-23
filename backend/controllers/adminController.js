const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const admin = await Admin.findOne({ username });
    if (!admin || admin.status !== 'active') {
      return res.status(401).json({ message: 'بيانات الدخول غير صحيحة أو الحساب غير مفعل' });
    }
    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'بيانات الدخول غير صحيحة' });
    }
    // إصدار JWT
    const token = jwt.sign({ id: admin._id, username: admin.username, role: 'admin' }, 'SECRET_KEY', { expiresIn: '1d' });
    admin.lastLogin = new Date();
    await admin.save();
    res.json({ token, admin: { id: admin._id, username: admin.username, email: admin.email } });
  } catch (err) {
    res.status(500).json({ message: 'خطأ في الخادم' });
  }
};

exports.updateProfile = async (req, res) => {
  const { id } = req.admin;
  const { name, email, password } = req.body;
  try {
    const admin = await Admin.findById(id);
    if (!admin) return res.status(404).json({ message: 'الأدمن غير موجود' });
    if (name) admin.name = name;
    if (email) admin.email = email;
    if (password) admin.password = password;
    await admin.save();
    res.json({ message: 'تم تحديث البيانات بنجاح' });
  } catch (err) {
    res.status(500).json({ message: 'خطأ في الخادم' });
  }
};
