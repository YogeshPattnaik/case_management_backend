const mongoose = require('mongoose');

const countrySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    isoCode: { type: String, required: true, unique: true },
    activeStatus: { type: Boolean, }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Country', countrySchema);
