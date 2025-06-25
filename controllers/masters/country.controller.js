const Country = require('../../models/masters/country.model');
const ApiError = require('../../utils/ApiError');
const logger = require('../../utils/logger');

// Create a new country
exports.createCountry = async (req, res, next) => {
  try {
    const { name, isoCode } = req.body;

    if (!name || !isoCode) {
      throw new ApiError(400, 'Country name and isoCode are required');
    }

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

// Get all countries
exports.getAllCountries = async (req, res, next) => {
  try {
    const countries = await Country.find().sort({ name: 1 }).where({ activeStatus: true});
    res.status(200).json({ success: true, data: countries.map((item) => ({
      id: item.id,
      name: item.name,
    })) });
  } catch (err) {
    next(err);
  }
};
