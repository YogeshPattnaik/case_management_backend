const mongoose = require('mongoose');
const CommissionType = require('../models/masters/commissionType.model');



const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/case_management_system'

console.log('uri:', uri);
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => console.error('❌ DB connection failed', err));

const seedCommissionType = async () => {
  try {
    const types = ['NCDRC', 'SCDRC', 'DCDRC'];
    for (const name of types) {
      const exists = await CommissionType.findOne({ name });
      if (!exists) {
        await CommissionType.create({ name });
        console.log(`CommissionType "${name}" created`);
      }
    }
  } catch (error) {
    console.error('Seeding failed:', error.message);
    process.exit(1);
  }
};

seedCommissionType();

// mongoose.connect(process.env.MONGODB_URI).then(async () => {
//   const types = ['NCDRC', 'SCDRC', 'DCDRC'];
//   for (const name of types) {
//     const exists = await CommissionType.findOne({ name });
//     if (!exists) {
//       await CommissionType.create({ name });
//       console.log(`CommissionType "${name}" created`);
//     }
//   }
//   process.exit(0);
// });
