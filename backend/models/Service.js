const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema({
  service_api: { type: Number, default: 0 },
  api_service: { type: Number, default: 0 },
  api_servicetype: { type: String, enum: ['1','2'], default: '2' },
  api_detail: { type: String, default: '' },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  service_line: { type: Number, default: 0 },
  service_type: { type: String, enum: ['1','2'], default: '2' },
  service_package: { type: String, default: '1' },
  service_name: { type: String, required: true },
  service_description: { type: String, default: '' },
  service_price: { type: Number, default: 0 },
  service_min: { type: Number, default: 0 },
  service_max: { type: Number, default: 0 },
  service_dripfeed: { type: String, enum: ['1','2'], default: '1' },
  service_autotime: { type: Number, default: 0 },
  service_autopost: { type: Number, default: 0 },
  service_speed: { type: String, enum: ['1','2','3','4'], default: '1' },
  want_username: { type: String, enum: ['1','2'], default: '1' },
  service_secret: { type: String, enum: ['1','2'], default: '2' },
  price_type: { type: String, enum: ['normal','percent','amount'], default: 'normal' },
  price_cal: { type: String, default: '' },
  instagram_second: { type: String, enum: ['1','2'], default: '2' },
  start_count: { type: String, default: 'none' },
  instagram_private: { type: String, enum: ['1','2'], default: '1' },
  name_lang: { type: String, default: '' },
  description_lang: { type: String, default: '' },
  time: { type: String, default: '' },
  time_lang: { type: String, default: '' }
});

module.exports = mongoose.model('Service', ServiceSchema);
