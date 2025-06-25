const mongoose = require('mongoose');
require('dotenv').config();

const Role = require('../models/masters/role.model');
const Permission = require('../models/masters/permission.model');
const RolePermission = require('../models/masters/rolePermission.model');

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ DB connection failed', err));

const seedRolePermissions = async () => {
  try {
    const superAdminRole = await Role.findOne({ roleName: 'Super Admin' });
    if (!superAdminRole) throw new Error('Super Admin role not found');

    const allPermissions = await Permission.find({});
    if (!allPermissions.length) throw new Error('No permissions found');

    const permissionMappings = allPermissions.map(permission => ({
      permissionId: permission._id,
      actions: ['create', 'read', 'update', 'delete'],
    }));

    await RolePermission.findOneAndUpdate(
      { roleId: superAdminRole._id },
      {
        roleId: superAdminRole._id,
        permissions: permissionMappings,
      },
      { upsert: true, new: true }
    );

    console.log(`Mapped ${permissionMappings.length} permissions to Super Admin role`);
    process.exit(0);
  } catch (error) {
    console.error('Seeding failed:', error.message);
    process.exit(1);
  }
};

seedRolePermissions();
