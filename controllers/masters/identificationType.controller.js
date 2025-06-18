const IdentificationType = require('../../models/masters/identificationType.model');
const ApiError = require('../../utils/ApiError');
const logger = require('../../utils/logger');

exports.create = async (req, res, next) => {
  try {
    const { name } = req.body;

    const exists = await IdentificationType.findOne({ name });
    if (exists) {
      throw new ApiError(409, 'Identification type already exists');
    }

    const created = await IdentificationType.create({ name });
    logger.info(`Identification type created → ${name}`);

    res.status(201).json({ success: true, data: created });
  } catch (error) {
    logger.error(`Create IdentificationType → ${error.message}`);
    next(error);
  }
};

exports.getAll = async (req, res, next) => {
  try {
    const types = await IdentificationType.find({});
    res.json({ success: true, data: types });
  } catch (error) {
    logger.error(`Get IdentificationTypes → ${error.message}`);
    next(error);
  }
};
