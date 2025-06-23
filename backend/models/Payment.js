const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
  client: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  client_balance: { type: Number, default: 0 },
  payment_amount: { type: Number, required: true },
  payment_method: { type: String, required: true },
  payment_status: { type: String, enum: ['pending','completed','failed'], default: 'pending' },
  payment_note: { type: String, default: '' },
  payment_mode: { type: String, default: 'Otomatik' },
  payment_create_date: { type: Date, default: Date.now },
  payment_update_date: { type: Date },
  payment_ip: { type: String },
  payment_extra: { type: String, default: '' },
  payment_bank: { type: Number, default: 0 }
});

module.exports = mongoose.model('Payment', PaymentSchema);
