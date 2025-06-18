const Joi = require('joi');

const createDistrict = Joi.object({
  body: Joi.object({
    name: Joi.string().required(),
    stateId: Joi.string().hex().length(24).required(),
  }),
});

module.exports = { createDistrict };
