const PostOffice = require('../../models/masters/postOffice.model');
const District = require('../../models/masters/district.model');
const State = require('../../models/masters/state.model');
const Country = require('../../models/masters/country.model');
const ApiError = require('../../utils/ApiError');
const logger = require('../../utils/logger');

// Get location by Pincode
exports.getLocationByPincode = async (req, res, next) => {
  try {
    const { pincode } = req.params;

    const postOffices = await PostOffice.find({ pincode }).populate({
      path: 'districtId',
      populate: {
        path: 'stateId',
        populate: {
          path: 'countryId',
        },
      },
    });

    if (!postOffices.length) {
      throw new ApiError(404, 'No data found for the given pincode');
    }

    const district = postOffices[0].districtId;
    const state = district.stateId;
    const country = state.countryId;

    res.status(200).json({
      success: true,
      data: {
        pincode,
        country: { id: country._id, name: country.name },
        state: { id: state._id, name: state.name },
        district: { id: district._id, name: district.name },
        postOffices: postOffices.map(po => ({ id: po._id, name: po.name })),
      },
    });
  } catch (error) {
    logger.error(`Get Location by Pincode → ${error.message}`);
    next(error);
  }
};
