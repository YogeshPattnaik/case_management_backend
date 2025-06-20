const mongoose = require('mongoose');
require('dotenv').config();
const User = require('../models/user/user.model');

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('Connected')).catch(console.error);

const updatePassword = async () => {
  try {
    const superAdmin = await User.findOne({ email: 'superadmin@cms.com' });

    if (!superAdmin) {
      console.log('Super Admin not found');
      return process.exit(1);
    }

    superAdmin.password = 'Pass@123';
    superAdmin.updatedBy = 'Script';
    superAdmin.updatedAt = new Date();

    await superAdmin.save();

    console.log('Super Admin password updated successfully');
    process.exit(0);
  } catch (err) {
    console.error('Error updating password:', err.message);
    process.exit(1);
  }
};

updatePassword();
