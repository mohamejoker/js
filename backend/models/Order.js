const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  client: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  service: { type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true },
  api_orderid: { type: Number, default: 0 },
  order_error: { type: String, default: '' },
  order_detail: { type: String, default: '' },
  order_api: { type: Number, default: 0 },
  api_serviceid: { type: Number, default: 0 },
  api_charge: { type: Number, default: 0 },
  api_currencycharge: { type: Number, default: 1 },
  order_profit: { type: Number, default: 0 },
  order_quantity: { type: Number, required: true },
  order_extras: { type: String, default: '' },
  order_charge: { type: Number, default: 0 },
  dripfeed: { type: String, enum: ['1','2','3'], default: '1' },
  dripfeed_id: { type: Number, default: 0 },
  subscriptions_id: { type: Number, default: 0 },
  subscriptions_type: { type: String, enum: ['1','2'], default: '1' },
  dripfeed_totalcharges: { type: Number },
  dripfeed_runs: { type: Number },
  dripfeed_delivery: { type: Number, default: 0 },
  dripfeed_interval: { type: Number },
  dripfeed_totalquantity: { type: Number },
  dripfeed_status: { type: String, enum: ['active','completed','canceled'], default: 'active' },
  order_url: { type: String, required: true },
  order_start: { type: Number, default: 0 },
  order_finish: { type: Number, default: 0 },
  order_remains: { type: Number, default: 0 },
  order_create: { type: Date, default: Date.now },
  order_status: { type: String, enum: ['pending','inprogress','completed','partial','processing','canceled'], default: 'pending' },
  subscriptions_status: { type: String, enum: ['active','paused','completed','canceled','expired','limit'], default: 'active' },
  subscriptions_username: { type: String },
  subscriptions_posts: { type: Number },
  subscriptions_delivery: { type: Number, default: 0 },
  subscriptions_delay: { type: Number },
  subscriptions_min: { type: Number },
  subscriptions_max: { type: Number },
  subscriptions_expiry: { type: Date },
  last_check: { type: Date, default: Date.now },
  order_where: { type: String, enum: ['site','api'], default: 'site' }
});

module.exports = mongoose.model('Order', OrderSchema);
