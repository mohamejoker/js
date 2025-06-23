const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const auth = require('../middlewares/auth');

// تسجيل الدخول
router.post('/login', adminController.login);
// تحديث بيانات الأدمن (يتطلب توكن)
router.post('/update-profile', auth, adminController.updateProfile);

module.exports = router;
