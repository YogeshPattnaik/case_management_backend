const Role = require('../../models/masters/role.model');
const ApiError = require('../../utils/ApiError');
const logger = require('../../utils/logger');

// Create Role
exports.createRole = async (req, res, next) => {
  try {
    const { roleId, roleName } = req.body;

    const existing = await Role.findOne({ $or: [{ roleId }, { roleName }] });
    if (existing) {
      throw new ApiError(409, 'Role already exists with same ID or Name');
    }

    const newRole = await Role.create({ roleId, roleName });

    res.status(201).json({
      success: true,
      message: 'Role created successfully',
      data: newRole,
    });
  } catch (err) {
    logger.error(`Create Role → ${err.message}`);
    next(err);
  }
};

// Get All Roles
exports.getAllRoles = async (req, res, next) => {
  try {
    const roles = await Role.find();

    res.status(200).json({
      success: true,
      data: roles,
    });
  } catch (err) {
    logger.error(`Get All Roles → ${err.message}`);
    next(err);
  }
};
