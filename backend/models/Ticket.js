const mongoose = require('mongoose');

const TicketReplySchema = new mongoose.Schema({
  client: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  time: { type: Date, default: Date.now },
  support: { type: String, enum: ['1','2'], default: '1' },
  message: { type: String, required: true }
});

const TicketSchema = new mongoose.Schema({
  client: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  subject: { type: String, required: true },
  time: { type: Date, default: Date.now },
  lastupdate_time: { type: Date, default: Date.now },
  client_new: { type: String, enum: ['1','2'], default: '2' },
  status: { type: String, enum: ['pending','answered','closed'], default: 'pending' },
  support_new: { type: String, enum: ['1','2'], default: '1' },
  canmessage: { type: String, enum: ['1','2'], default: '2' },
  replies: [TicketReplySchema]
});

module.exports = mongoose.model('Ticket', TicketSchema);
