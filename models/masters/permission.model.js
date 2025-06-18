const mongoose = require('mongoose');

const permissionSchema = new mongoose.Schema({
  name: String,
  route: String,
  module: String,
  group: String,
  icon: String,
  actions: [String] // ['create', 'read', 'update', 'delete']
}, { timestamps: true });

module.exports = mongoose.model('Permission', permissionSchema);