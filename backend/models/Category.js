const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
  category_name: { type: String, required: true },
  category_line: { type: Number, default: 0 },
  category_type: { type: String, enum: ['1','2'], default: '2' },
  category_secret: { type: String, enum: ['1','2'], default: '2' },
  category_icon: { type: String, default: '' }
});

module.exports = mongoose.model('Category', CategorySchema);
