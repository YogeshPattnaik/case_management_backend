const Joi = require('joi');

exports.createIdentificationType = {
  body: Joi.object({
    name: Joi.string().required()
  }),
};
