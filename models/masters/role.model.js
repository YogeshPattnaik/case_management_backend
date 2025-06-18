const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema(
  {
    roleName: {
      type: String,
      required: true,
      unique: true,
    },
    createdAt: {
      type: Date,
      default: null,
    },
    updatedAt: {
      type: Date,
      default: null,
    },
    activeStatus: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  {
    timestamps: false, // You are managing createdAt/updatedAt manually
    collection: 'master_role'
  }
);

module.exports = mongoose.model('Role', roleSchema);
