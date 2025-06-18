const Joi = require('joi');

const getLocationByPincode = Joi.object({
  params: Joi.object({
    pincode: Joi.string().length(6).required(),
  }),
});

module.exports = { getLocationByPincode };
