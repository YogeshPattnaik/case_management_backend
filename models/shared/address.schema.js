const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
  country: {
    id: { type: mongoose.Schema.Types.ObjectId, ref: 'Country' },
    name: String,
  },
  state: {
    id: { type: mongoose.Schema.Types.ObjectId, ref: 'State' },
    name: String,
  },
  district: {
    id: { type: mongoose.Schema.Types.ObjectId, ref: 'District' },
    name: String,
  },
  postOffice: {
    id: { type: mongoose.Schema.Types.ObjectId, ref: 'PostOffice' },
    name: String,
  },
  pincode: String,
  houseNumber: String,
  streetNumber: String,
  landmark: String,
}, { _id: false });

module.exports = addressSchema;
