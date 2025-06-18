const ApiError = require('../../utils/ApiError');

module.exports = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user?.role?.name)) {
      return next(new ApiError(403, 'Access denied. Not authorized.'));
    }
    next();
  };
};
