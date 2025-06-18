const mongoose = require('mongoose');

const rolePermissionSchema = new mongoose.Schema({
  roleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Role' },
  permissions: [
    {
      permissionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Permission' },
      actions: [String]
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model('RolePermission', rolePermissionSchema);
