const Permission = require('../../models/masters/permission.model');
const ApiError = require('../../utils/ApiError');
const logger = require('../../utils/logger');

exports.getAllPermissions = async (req, res, next) => {
  try {
    const permissions = await Permission.find();
    res.status(200).json({ success: true, data: permissions });
  } catch (err) {
    logger.error(`Get All Permissions → ${err.message}`);
    next(err);
  }
};

exports.createPermission = async (req, res, next) => {
  try {
    const { name, route, icon, module, group, actions } = req.body;

    const exists = await Permission.findOne({ name });
    if (exists) throw new ApiError(409, 'Permission already exists');

    const permission = await Permission.create({ name, route, icon, module, group, actions });
    res.status(201).json({ success: true, data: permission });
  } catch (err) {
    logger.error(`Create Permission → ${err.message}`);
    next(err);
  }
};
