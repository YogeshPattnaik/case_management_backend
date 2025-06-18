const RolePermission = require('../../models/masters/rolePermission.model');

exports.getPermissionsByRole = async (req, res, next) => {
  try {
    const { roleId } = req.params;

    const result = await RolePermission.findOne({ roleId }).populate('permissions.permissionId');
    if (!result) return res.status(200).json({ success: true, permissions: [] });

    const formatted = result.permissions.map(p => ({
      id: p.permissionId._id,
      name: p.permissionId.name,
      route: p.permissionId.route,
      module: p.permissionId.module,
      icon: p.permissionId.icon,
      actions: p.actions
    }));

    res.status(200).json({ success: true, permissions: formatted });
  } catch (err) {
    next(err);
  }
};

exports.assignPermissionsToRole = async (req, res, next) => {
  try {
    const { roleId, permissions } = req.body;

    await RolePermission.findOneAndUpdate(
      { roleId },
      { roleId, permissions },
      { upsert: true, new: true }
    );

    res.status(200).json({ success: true, message: 'Permissions updated' });
  } catch (err) {
    next(err);
  }
};
