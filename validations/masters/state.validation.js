const Joi = require('joi');

const createState = Joi.object({
  body: Joi.object({
    name: Joi.string().required(),
    countryId: Joi.string().hex().length(24).required(),
  }),
});

module.exports = { createState };
