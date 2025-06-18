const State = require('../../models/masters/state.model');
const ApiError = require('../../utils/ApiError');
const logger = require('../../utils/logger');

exports.createState = async (req, res, next) => {
  try {
    const { name, countryId } = req.body;

    if (!name || !countryId) {
      throw new ApiError(400, 'State name and countryId are required');
    }

    const state = await State.create({ name, countryId });
    res.status(201).json({ success: true, data: state });
  } catch (error) {
    logger.error(`State Creation Failed → ${error.message}`);
    next(error);
  }
};

exports.getStatesByCountry = async (req, res, next) => {
  try {
    const { countryId } = req.params;

    const states = await State.find({ countryId }).sort({ name: 1 });

    res.status(200).json({ success: true, data: states });
  } catch (error) {
    logger.error(`Fetching States Failed → ${error.message}`);
    next(error);
  }
};
