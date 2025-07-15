const mongoose = require('mongoose');

const commissionTypeSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true }
}, { timestamps: true });

module.exports = mongoose.model('CommissionType', commissionTypeSchema);
