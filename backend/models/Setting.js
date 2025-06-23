const mongoose = require('mongoose');

const SettingSchema = new mongoose.Schema({
  site_seo: { type: String },
  site_title: { type: String },
  site_description: { type: String },
  site_keywords: { type: String },
  site_logo: { type: String },
  site_name: { type: String },
  site_currency: { type: String, default: 'USD' },
  favicon: { type: String },
  site_language: { type: String, default: 'en' },
  site_theme: { type: String },
  recaptcha: { type: String, enum: ['1','2'], default: '1' },
  recaptcha_key: { type: String },
  recaptcha_secret: { type: String },
  custom_header: { type: String },
  custom_footer: { type: String },
  ticket_system: { type: String, enum: ['1','2'], default: '2' },
  register_page: { type: String, enum: ['1','2'], default: '2' },
  service_speed: { type: String, enum: ['1','2'], default: '2' },
  service_list: { type: String, enum: ['1','2'], default: '2' },
  dolar_charge: { type: Number },
  euro_charge: { type: Number },
  smtp_user: { type: String },
  smtp_pass: { type: String },
  smtp_server: { type: String },
  smtp_port: { type: String },
  smtp_protocol: { type: String, enum: ['0','ssl','tls'], default: '0' },
  alert_type: { type: String, enum: ['1','2','3'], default: '2' },
  admin_mail: { type: String },
  admin_telephone: { type: String },
  site_maintenance: { type: String, enum: ['1','2'], default: '2' },
  currency: { type: String, default: 'USD' },
  csymbol: { type: String }
});

module.exports = mongoose.model('Setting', SettingSchema);
