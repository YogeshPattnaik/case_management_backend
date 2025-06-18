const mongoose = require('mongoose');

const districtSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    stateId: { type: mongoose.Schema.Types.ObjectId, ref: 'State', required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('District', districtSchema);
