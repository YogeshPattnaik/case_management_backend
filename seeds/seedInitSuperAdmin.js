const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// models
const Role = require('../models/masters/role.model');
const User = require('../models/user/user.model');
const Country = require('../models/masters/country.model');
const State = require('../models/masters/state.model');
const District = require('../models/masters/district.model');
const PostOffice = require('../models/masters/postOffice.model');
const IdentificationType = require('../models/masters/identificationType.model');

// DB connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected')).catch(console.error);

const seed = async () => {
  try {
    // 1. Create Super Admin Role
    const superAdminRole = await Role.create({
      roleName: 'Super Admin',
      activeStatus: true,
      createdAt: new Date()
    });

    // 2. Create Master Address Entities
    const country = await Country.create({ name: 'India', isoCode: 'IN' });
    const state = await State.create({ name: 'Delhi', countryId: country._id });
    const district = await District.create({ name: 'South East', stateId: state._id });
    const postOffice = await PostOffice.create({ name: 'Molarband B.O', districtId: district._id, pincode: '452001' });

    // 3. Create Identification Type
    const idType = await IdentificationType.create({ name: 'Aadhar Card' });

    // 4. Create Super Admin User
    const hashedPassword = await bcrypt.hash('Pass@123', 10);

    const superAdmin = await User.create({
      fullName: 'Super Admin',
      mobile: '8826330566',
      email: 'superadmin@cms.com',
      password: hashedPassword,
      role: {
        id: superAdminRole._id,
        name: superAdminRole.roleName
      },
      address: {
        country: { id: country._id, name: country.name },
        state: { id: state._id, name: state.name },
        district: { id: district._id, name: district.name },
        postOffice: { id: postOffice._id, name: postOffice.name },
        pincode: postOffice.pincode,
        houseNumber: '110',
        streetNumber: '10 C',
        landmark: 'Near GuruDwara'
      },
      identification: {
        type: { id: idType._id, name: idType.name },
        number: '801204405293',
        documentUrl: 'https://avatars.githubusercontent.com/u/64351256?s=400&u=b39eef9bd2ea76cd47b9187bce6f2343f13e0a53&v=4'
      },
      createdBy: 'System',
      createdAt: new Date(),
      updatedBy: null,
      updatedAt: null
    });

    console.log('✅ Super Admin seeded:', superAdmin.email);
    process.exit(0);
  } catch (err) {
    console.error('❌ Seeding failed:', err.message);
    process.exit(1);
  }
};

seed();
