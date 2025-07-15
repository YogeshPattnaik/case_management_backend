const mongoose = require('mongoose');

const stateSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    countryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Country',
      required: true,
    },
    commissionType: {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CommissionType',
        required: true,
      },
      name: String,
    },
    commissionId: { type: String, required: true, unique: true },
    activeStatus: { type: Boolean , default: true},
  },
  { timestamps: true }
);

module.exports = mongoose.model('State', stateSchema);
