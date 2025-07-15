const Joi = require('joi');

const countrySchema = Joi.object({
  isoCode: Joi.string().required(),
  name: Joi.string().required(),
  activeStatus: Joi.boolean().optional()
});

module.exports = {
  countrySchema,
  CountryValidationSchema: Joi.object({
    body: countrySchema,
  }),
};
