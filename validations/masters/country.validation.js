const Joi = require('joi');

const createCountry = Joi.object({
  body: Joi.object({
    name: Joi.string().required(),
  }),
});

module.exports = { createCountry };
