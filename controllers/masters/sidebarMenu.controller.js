const SidebarMenu = require('../../models/masters/sidebarMenu.model');
const ApiError = require('../../utils/ApiError');
const logger = require('../../utils/logger');

// Get all sidebar menus (nested)
exports.getSidebarMenus = async (req, res, next) => {
  try {
    const allMenus = await SidebarMenu.find({}).lean();

    const menuMap = {};
    allMenus.forEach(menu => menuMap[menu._id] = { ...menu, children: [] });

    const rootMenus = [];

    allMenus.forEach(menu => {
      if (menu.parentId) {
        menuMap[menu.parentId]?.children.push(menuMap[menu._id]);
      } else {
        rootMenus.push(menuMap[menu._id]);
      }
    });

    res.json({ success: true, data: rootMenus });
  } catch (err) {
    logger.error(`Get Sidebar Menus → ${err.message}`);
    next(err);
  }
};

// Get flat list (only for super admin)
exports.getFlatSidebarMenus = async (req, res, next) => {
  try {
    const menus = await SidebarMenu.find({}).sort({ sortOrder: 1 });
    res.json({ success: true, data: menus });
  } catch (err) {
    logger.error(`Get Flat Sidebar Menus → ${err.message}`);
    next(err);
  }
};

// Create a new sidebar menu
exports.createSidebarMenu = async (req, res, next) => {
  try {
    const menu = new SidebarMenu(req.body);
    await menu.save();
    res.status(201).json({ success: true, data: menu });
  } catch (err) {
    logger.error(`Create Sidebar Menu → ${err.message}`);
    next(err);
  }
};

// Update menu
exports.updateSidebarMenu = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updated = await SidebarMenu.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true
    });

    if (!updated) throw new ApiError(404, 'Sidebar menu not found');

    res.json({ success: true, data: updated });
  } catch (err) {
    logger.error(`Update Sidebar Menu → ${err.message}`);
    next(err);
  }
};

// Delete menu
exports.deleteSidebarMenu = async (req, res, next) => {
  try {
    const { id } = req.params;

    const deleted = await SidebarMenu.findByIdAndDelete(id);
    if (!deleted) throw new ApiError(404, 'Sidebar menu not found');

    await SidebarMenu.deleteMany({ parentId: id });

    res.json({ success: true, message: 'Sidebar menu deleted' });
  } catch (err) {
    logger.error(`Delete Sidebar Menu → ${err.message}`);
    next(err);
  }
};
