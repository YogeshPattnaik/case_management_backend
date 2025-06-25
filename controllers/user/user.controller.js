const User = require('../../models/user/user.model');
const RolePermission = require('../../models/masters/rolePermission.model');
const Role = require('../../models/masters/role.model');
const SidebarMenu = require('../../models/masters/sidebarMenu.model');
const Permission = require('../../models/masters/permission.model');
const jwt = require('jsonwebtoken');
const ApiError = require('../../utils/ApiError');
const logger = require('../../utils/logger');

// User Registration
exports.register = async (req, res, next) => {
  try {
    const { fullName, email, mobile, password } = req.body;

    const exists = await User.findOne({ $or: [{ email }, { mobile }] });
    if (exists) {
      throw new ApiError(409, 'User already exists');
    }

    const user = new User({ fullName, email, mobile, password });
    await user.save();

    logger.info(`User Registered: ${email}`);
    res.status(201).json({ success: true, userId: user._id });
  } catch (err) {
    logger.error(`Register User → ${err.message}`);
    next(err);
  }
};

// Complete profile
exports.completeProfile = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { role, address, identification } = req.body;

    if (!req.file || !req.file.path) {
      throw new ApiError(400, 'Document upload failed');
    }

    const documentUrl = req.file.path || req.file.location;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        role,
        address,
        identification,
        identification: {
          ...identification,
          documentUrl: req.file.path, // Cloudinary URL
        },
      },
      { new: true }
    );

    if (!updatedUser) throw new ApiError(404, 'User not found');

    logger.info(`User Profile Completed: ${userId}`);
    res.json({ success: true, data: updatedUser });
  } catch (err) {
    logger.error(`Complete Profile → ${err.message}`);
    next(err);
  }
};

// User login
exports.login = async (req, res, next) => {
  try {
    const { emailOrMobile, password } = req.body;

    const user = await User.findOne({
      $or: [{ email: emailOrMobile }, { mobile: emailOrMobile }],
    });

    if (!user || !(await user.isPasswordMatch(password))) {
      throw new ApiError(401, 'Invalid credentials');
    }

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    res
      .cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      })
      .json({
        success: true,
        accessToken,
        user: {
          id: user._id,
          fullName: user.fullName,
          email: user.email,
          mobile: user.mobile,
          role: user.role,
        },
      });
  } catch (err) {
    logger.error(`Login Error → ${err.message}`);
    next(err);
  }
};

// get sidebar menu according to role id
exports.getSidebar = async (req, res, next) => {
  try {
    const roleId = req.user.role.id;

    const rolePermission = await RolePermission.findOne({ roleId });

    if (!rolePermission || !rolePermission.permissions?.length) {
      return res.status(200).json({ success: true, menu: [] });
    }

    const readablePermissionIds = rolePermission.permissions
      .filter(rp => rp.actions.includes('read'))
      .map(rp => rp.permissionId.toString());

    const allMenus = await SidebarMenu.find({ activeStatus: true }).lean();

    const allowedMenus = allMenus.filter(menu =>
      menu.permissionId ? readablePermissionIds.includes(menu.permissionId.toString()) : true
    );

    const menuMap = {};
    allowedMenus.forEach(menu => {
      menu.children = [];
      menuMap[menu._id] = menu;
    });

    const finalMenu = [];
    allowedMenus.forEach(menu => {
      if (menu.parentId && menuMap[menu.parentId]) {
        menuMap[menu.parentId].children.push(menu);
      } else {
        finalMenu.push(menu);
      }
    });

    const formatted = finalMenu.map(formatSidebarItem);

    res.status(200).json({ success: true, menu: formatted });
  } catch (err) {
    logger.error(`Get Sidebar Menu Error → ${err.message}`);
    next(new ApiError(500, 'Failed to load sidebar menu'));
  }
};

function formatSidebarItem(item) {
  return {
    label: item.name || item.title,
    path: item.route || item.path || '',
    icon: item.icon || '',
    children: item.children?.map(formatSidebarItem) || []
  };
}

// get User list with pagination
exports.getPaginatedUsers = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const skip = (page - 1) * limit;

    const [users, total] = await Promise.all([
      User.find({})
        .skip(skip)
        .limit(limit)
        .select('fullName email mobile role createdAt'),
      User.countDocuments(),
    ]);

    res.status(200).json({
      success: true,
      data: users,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (err) {
    next(err);
  }
};

// assign role to a user
exports.assignRoleToUser = async (req, res, next) => {
  try {
    const { roleId, userId } = req.body;

    const role = await Role.findById(roleId);
    if (!role) return res.status(404).json({ success: false, message: 'Role not found' });

    const user = await User.findByIdAndUpdate(
      userId,
      {
        role: {
          id: role._id,
          name: role.roleName,
        },
      },
      { new: true }
    );

    if (!user) return res.status(404).json({ success: false, message: 'User not found' });

    res.status(200).json({ success: true, message: 'Role assigned successfully', user });
  } catch (err) {
    next(err);
  }
};
