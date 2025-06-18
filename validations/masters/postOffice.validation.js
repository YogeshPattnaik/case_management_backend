const Joi = require('joi');

const createPostOffice = Joi.object({
  body: Joi.object({
    name: Joi.string().required(),
    pincode: Joi.string().length(6).required(),
    districtId: Joi.string().hex().length(24).required(),
  }),
});

module.exports = { createPostOffice };
