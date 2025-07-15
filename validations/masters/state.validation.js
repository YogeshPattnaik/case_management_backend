const Joi = require('joi');

const stateSchema = Joi.object({
  name: Joi.string().required(),
  countryId: Joi.string().hex().length(24).required(),
  activeStatus: Joi.boolean().optional(),
});

module.exports = {
  stateSchema,
  stateValidationSchema: Joi.object({
    body: stateSchema,
  }),
};
