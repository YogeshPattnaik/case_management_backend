const mongoose = require('mongoose');
require('dotenv').config();

const Permission = require('../models/masters/permission.model');

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('✅ MongoDB connected')).catch(console.error);

const fullActions = ['create', 'read', 'update', 'delete'];

const seed = async () => {
  try {
    const permissions = [
      // USER MODULE
      {
        name: 'User List',
        route: '/admin/users',
        module: 'User',
        group: 'User Settings',
        icon: 'People',
        actions: fullActions,
      },
      {
        name: 'User-Role Mapping',
        route: '/admin/map-users',
        module: 'User',
        group: 'User Settings',
        icon: 'PersonAdd',
        actions: fullActions,
      },
      {
        name: 'Role-Permission Mapping',
        route: '/admin/map-roles',
        module: 'User',
        group: 'User Settings',
        icon: 'AdminPanelSettings',
        actions: fullActions,
      },

      // MASTER MODULE
      {
        name: 'Roles',
        route: '/masters/roles',
        module: 'Master',
        group: 'Master Settings',
        icon: 'Badge',
        actions: fullActions,
      },
      {
        name: 'Countries',
        route: '/masters/countries',
        module: 'Master',
        group: 'Master Settings',
        icon: 'Public',
        actions: fullActions,
      },
      {
        name: 'States',
        route: '/masters/states',
        module: 'Master',
        group: 'Master Settings',
        icon: 'Map',
        actions: fullActions,
      },
      {
        name: 'Districts',
        route: '/masters/districts',
        module: 'Master',
        group: 'Master Settings',
        icon: 'MapOutlined',
        actions: fullActions,
      },
      {
        name: 'Post Offices',
        route: '/masters/post-offices',
        module: 'Master',
        group: 'Master Settings',
        icon: 'LocalPostOffice',
        actions: fullActions,
      },
      {
        name: 'Identification Types',
        route: '/masters/identification-types',
        module: 'Master',
        group: 'Master Settings',
        icon: 'ContactMail',
        actions: fullActions,
      }
    ];

    await Permission.insertMany(permissions);
    console.log(`✅ Inserted ${permissions.length} permissions`);
    process.exit(0);
  } catch (err) {
    console.error('❌ Failed to seed permissions:', err.message);
    process.exit(1);
  }
};

seed();
