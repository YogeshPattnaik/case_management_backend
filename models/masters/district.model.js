const mongoose = require('mongoose');

const districtSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    stateId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'State',
      required: true,
    },
    commissionType: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'CommissionType',
      required: true,
    },
    commissionId: { type: String, required: true, unique: true },
    parentCommissionId: { type: String, required: true },
    activeStatus: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('District', districtSchema);
