const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const AdminSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  status: { type: String, enum: ['active', 'banned'], default: 'active' },
  registerDate: { type: Date, default: Date.now },
  lastLogin: { type: Date },
});

// تشفير كلمة المرور قبل الحفظ
AdminSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// دالة مقارنة كلمة المرور
AdminSchema.methods.comparePassword = function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// إخفاء كلمة المرور عند التحويل إلى JSON
AdminSchema.set('toJSON', {
  transform: function(doc, ret, options) {
    delete ret.password;
    return ret;
  }
});

module.exports = mongoose.model('Admin', AdminSchema);
