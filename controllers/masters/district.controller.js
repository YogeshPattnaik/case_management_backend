const District = require('../../models/masters/district.model');
const ApiError = require('../../utils/ApiError');
const logger = require('../../utils/logger');

exports.createDistrict = async (req, res, next) => {
  try {
    const { name, stateId } = req.body;

    if (!name || !stateId) {
      throw new ApiError(400, 'District name and stateId are required');
    }

    const district = await District.create({ name, stateId });
    res.status(201).json({ success: true, data: district });
  } catch (error) {
    logger.error(`District Creation Failed → ${error.message}`);
    next(error);
  }
};

exports.getDistrictsByState = async (req, res, next) => {
  try {
    const { stateId } = req.params;

    const districts = await District.find({ stateId }).sort({ name: 1 });

    res.status(200).json({ success: true, data: districts });
  } catch (error) {
    logger.error(`Fetching Districts Failed → ${error.message}`);
    next(error);
  }
};
