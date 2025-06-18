const mongoose = require('mongoose');

const postOfficeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    pincode: { type: String, required: true },
    districtId: { type: mongoose.Schema.Types.ObjectId, ref: 'District', required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('PostOffice', postOfficeSchema);
