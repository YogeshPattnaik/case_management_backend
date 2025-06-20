const mongoose = require('mongoose');
require('dotenv').config();

const User = require('../models/user/user.model');
const Role = require('../models/masters/role.model');
const Country = require('../models/masters/country.model');
const State = require('../models/masters/state.model');
const District = require('../models/masters/district.model');
const PostOffice = require('../models/masters/postOffice.model');
const IdentificationType = require('../models/masters/identificationType.model');

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('🟢 MongoDB Connected')).catch(console.error);

const seed = async () => {
  try {
    // 1. Super Admin Role
    let superAdminRole = await Role.findOne({ roleName: 'Super Admin' });
    if (!superAdminRole) {
      superAdminRole = await Role.create({
        roleName: 'Super Admin',
        activeStatus: true,
        createdAt: new Date(),
      });
      console.log('Role created: Super Admin');
    }

    // 2. Master Location Setup
    let country = await Country.findOne({ name: 'India' });
    if (!country) {
      country = await Country.create({ name: 'India', isoCode: 'IN' });
      console.log('Country: India');
    }

    let state = await State.findOne({ name: 'Delhi', countryId: country._id });
    if (!state) {
      state = await State.create({ name: 'Delhi', countryId: country._id });
      console.log('State: Delhi');
    }

    let district = await District.findOne({ name: 'South East', stateId: state._id });
    if (!district) {
      district = await District.create({ name: 'South East', stateId: state._id });
      console.log('District: South East');
    }

    let postOffice = await PostOffice.findOne({ name: 'Molarband B.O', districtId: district._id });
    if (!postOffice) {
      postOffice = await PostOffice.create({
        name: 'Molarband B.O',
        districtId: district._id,
        pincode: '452001',
      });
      console.log('Post Office: Molarband B.O');
    }

    // 3. Identification Type
    let idType = await IdentificationType.findOne({ name: 'Aadhar Card' });
    if (!idType) {
      idType = await IdentificationType.create({ name: 'Aadhar Card' });
      console.log('Identification Type: Aadhar Card');
    }

    // 4. Create Super Admin if not exists
    const existingUser = await User.findOne({ email: 'superadmin@cms.com' });
    if (existingUser) {
      console.log('ℹ️ Super Admin already exists:', existingUser.email);
    } else {
      const superAdmin = new User({
        fullName: 'Super Admin',
        mobile: '8826330566',
        email: 'superadmin@cms.com',
        password: 'Pass@123', // plain password — will be hashed by pre-save
        role: {
          id: superAdminRole._id,
          name: superAdminRole.roleName,
        },
        address: {
          country: { id: country._id, name: country.name },
          state: { id: state._id, name: state.name },
          district: { id: district._id, name: district.name },
          postOffice: { id: postOffice._id, name: postOffice.name },
          pincode: postOffice.pincode,
          houseNumber: '110',
          streetNumber: '10 C',
          landmark: 'Near GuruDwara',
        },
        identification: {
          type: { id: idType._id, name: idType.name },
          number: '801204405293',
          documentUrl: 'https://your-url.com/aadhar.jpg',
        },
        createdBy: 'System',
        createdAt: new Date(),
      });

      await superAdmin.save();
      console.log('Super Admin created:', superAdmin.email);
    }

    process.exit(0);
  } catch (err) {
    console.error('❌ Seeding Error:', err.message);
    process.exit(1);
  }
};

seed();
