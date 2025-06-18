const mongoose = require('mongoose');

const identificationTypeSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true }
}, { timestamps: true });

module.exports = mongoose.model('IdentificationType', identificationTypeSchema);
