const jwt = require('jsonwebtoken');
const ApiError = require('../../utils/ApiError');

module.exports = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return next(new ApiError(401, 'Access denied. No token provided'));

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    next(new ApiError(400, 'Invalid token'));
  }
};
