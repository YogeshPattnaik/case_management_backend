const PostOffice = require('../../models/masters/postOffice.model');
const ApiError = require('../../utils/ApiError');
const logger = require('../../utils/logger');

// Create Post Office
exports.createPostOffice = async (req, res, next) => {
  try {
    const { name, pincode, districtId } = req.body;
    if (!name || !pincode || !districtId) {
      throw new ApiError(400, 'Name, Pincode, and DistrictId are required');
    }

    const postOffice = await PostOffice.create({ name, pincode, districtId });
    res.status(201).json({ success: true, data: postOffice });
  } catch (error) {
    logger.error(`Create PostOffice → ${error.message}`);
    next(error);
  }
};

// Get all post offices by District
exports.getPostOfficesByDistrict = async (req, res, next) => {
  try {
    const { districtId } = req.params;
    const postOffices = await PostOffice.find({ districtId }).sort({ name: 1 });
    res.status(200).json({ success: true, data: postOffices });
  } catch (error) {
    logger.error(`Get PostOffices by District → ${error.message}`);
    next(error);
  }
};
