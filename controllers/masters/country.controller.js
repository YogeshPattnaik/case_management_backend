const ApiError = require('../../utils/ApiError');
const Country = require('../../models/masters/country.model');
const logger = require('../../utils/logger');

// Create a new country
exports.createCountry = async (req, res, next) => {
  try {
    const { name, isoCode } = req.body;

    const exists = await Country.findOne({ $or: [{ name }, { isoCode }] });
    if (exists) {
      throw new ApiError(409, 'Country already exists');
    }

    const country = await Country.create({ name, isoCode, activeStatus: true });
    logger.info(`Country created: ${name}`);

    res.status(201).json({ success: true, data: country });
  } catch (err) {
    next(err);
  }
};

// Update country
exports.updateCountry = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, isoCode, activeStatus } = req.body;

    if(!id) {
      throw new ApiError(400, 'Please send id, id is missing!!');
    }

    const existingCountry = await Country.findOne({
      _id: { $ne: id},
      $or: [{name}, {isoCode}]
    });

    if (existingCountry) {
      throw new ApiError(409, 'Another country with same name or ISO code exist')
    };

    const updatePayload = { name, isoCode };
    if (activeStatus !== undefined) {
      updatePayload.activeStatus = activeStatus;
    }

    const updated = await Country.findByIdAndUpdate(id, updatePayload, { new: true });
    if (!updated) {
      throw new ApiError(404, 'Country not found');
    }

    res.status(200).json({ success: true, data: updated });
  } catch (error) {
    next(error)
  }
}

// Get all countries
exports.getAllCountries = async (req, res, next) => {
  try {
    const countries = await Country.find().sort({ name: 1 });
    res.status(200).json({ success: true, data: countries });
  } catch (err) {
    next(err);
  }
};
