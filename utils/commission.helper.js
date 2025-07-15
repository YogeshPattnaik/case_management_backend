const State = require('../models/masters/state.model');
const District = require('../models/masters/district.model');

async function generateStateCommissionId() {
  const states = await State.find({
    commissionId: { $exists: true}
  }).sort({ commissionId: -1 }).limit(1);
  console.log('states', states);
  if (states.length === 0) return '11010000';

  const lastCommissionId = states[0].commissionId;
  const stateNumber = parseInt(lastCommissionId.slice(2, 4)) + 1;
  return `11${stateNumber.toString().padStart(2, '0')}0000`;
}

async function generateDistrictCommissionId(stateCommissionId) {
  const statePrefix = stateCommissionId.slice(0, 4);
  const districts = await District.find({
    parentCommissionId: stateCommissionId,
  }).sort({ commissionId: -1 });

  let nextSuffix = 1;
  if (districts.length > 0) {
    const lastDistrictId = districts[0].commissionId;
    nextSuffix = parseInt(lastDistrictId.slice(4)) + 1;
  }

  return `${statePrefix}${nextSuffix.toString().padStart(4, '0')}`;
}

module.exports = {
  generateStateCommissionId,
  generateDistrictCommissionId,
};
