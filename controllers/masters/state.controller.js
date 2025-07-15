const State = require('../../models/masters/state.model');
const CommissionType = require('../../models/masters/commissionType.model');
const { generateStateCommissionId } = require('../../utils/commission.helper');
const ApiError = require('../../utils/ApiError');
const logger = require('../../utils/logger');

exports.createState = async (req, res, next) => {
  try {
    const { name, countryId } = req.body;

    if (!name || !countryId) {
      throw new ApiError(400, 'State name and countryId are required');
    }

    const commissionId = await generateStateCommissionId();
    const type = await CommissionType.findOne({ name: 'SCDRC' });

    const state = await State.create({
      name,
      countryId,
      commissionId,
      commissionType: { id: type._id, name: type.name },
    });
    res.status(201).json({ success: true, data: state });
  } catch (error) {
    logger.error(`State Creation Failed → ${error.message}`);
    next(error);
  }
};

exports.getStatesByCountry = async (req, res, next) => {
  try {
    const { countryId } = req.query;

    if (!countryId) {
      throw new ApiError(400, 'countryId is required as a query parameter');
    }

    const states = await State.find({ countryId }).sort({ name: 1 });

    res.status(200).json({ success: true, data: states });
  } catch (error) {
    logger.error(`Fetching States Failed → ${error.message}`);
    next(error);
  }
};
