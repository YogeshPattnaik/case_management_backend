const mongoose = require('mongoose');

const sidebarMenuSchema = new mongoose.Schema({
  title: { type: String, required: true },
  path: { type: String, required: false }, // only for leaf nodes
  icon: { type: String, required: false },
  parentId: { type: mongoose.Schema.Types.ObjectId, ref: 'SidebarMenu', default: null },
  roles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Role' }],
  permissions: [{ type: String, enum: ['create', 'read', 'update', 'delete'] }],
  sortOrder: { type: Number, default: 0 },
  activeStatus: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('SidebarMenu', sidebarMenuSchema);
