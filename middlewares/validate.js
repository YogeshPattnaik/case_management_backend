const Joi = require('joi');
const ApiError = require('../utils/ApiError');

const validate = (schema) => (req, res, next) => {
  const data = {
    body: req.body,
    query: req.query,
    params: req.params,
  };

  const { error } = schema.validate(data, { abortEarly: false, allowUnknown: true });

  if (error) {
    const message = error.details.map(detail => detail.message).join(', ');
    return next(new ApiError(400, message));
  }

  return next();
};

module.exports = validate;
