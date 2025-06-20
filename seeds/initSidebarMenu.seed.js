const mongoose = require('mongoose');
require('dotenv').config();

const SidebarMenu = require('../models/masters/sidebarMenu.model');
const Role = require('../models/masters/role.model');

mongoose.connect(process.env.MONGODB_URI).then(() => {
  console.log('MongoDB connected');
}).catch(console.error);

const seed = async () => {
  try {
    const superAdminRole = await Role.findOne({ roleName: 'Super Admin' });
    if (!superAdminRole) throw new Error('Super Admin role not found');

    const sidebarItems = [
      {
        title: 'Dashboard',
        path: '/super-admin/dashboard',
        icon: 'dashboard',
        roles: [superAdminRole._id],
      },
      {
        title: 'Masters',
        icon: 'folder',
        children: [
          { title: 'Countries', path: '/masters/countries' },
          { title: 'States', path: '/masters/states' },
          { title: 'Districts', path: '/masters/districts' },
          { title: 'Post Offices', path: '/masters/post-offices' },
          { title: 'Identification Types', path: '/masters/identifications' },
          { title: 'Roles', path: '/masters/roles' },
          { title: 'Permissions', path: '/masters/permissions' },
          { title: 'Sidebar Menus', path: '/masters/sidebar' },
        ]
      },
      {
        title: 'Users',
        icon: 'users',
        children: [
          { title: 'User List', path: '/users/list' },
          { title: 'User-Role Mapping', path: '/users/role-mapping' },
          { title: 'Role-Permission Mapping', path: '/users/permission-mapping' },
          { title: 'Sidebar-Role Mapping', path: '/users/sidebar-mapping' },
        ]
      }
    ];

    // Create parent + children recursively
    for (let item of sidebarItems) {
      const { children, ...parent } = item;
      const parentMenu = await SidebarMenu.create({
        ...parent,
        roles: [superAdminRole._id]
      });

      if (children) {
        for (let child of children) {
          await SidebarMenu.create({
            ...child,
            parentId: parentMenu._id,
            roles: [superAdminRole._id]
          });
        }
      }
    }

    console.log('Sidebar menus seeded');
    process.exit(0);
  } catch (err) {
    console.error('Sidebar seeding failed:', err.message);
    process.exit(1);
  }
};

seed();
