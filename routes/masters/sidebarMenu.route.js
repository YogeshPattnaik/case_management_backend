const express = require('express');
const router = express.Router();

const sidebarController = require('../../controllers/masters/sidebarMenu.controller');
const validate = require('../../middlewares/validate');
const authenticate = require('../../middlewares/auth/authenticate');
const sidebarValidation = require('../../validations/masters/sidebarMenu.validation');

/**
 * All routes below require authentication
 */
router.use(authenticate);

// Get all menus (nested)
router.get('/', sidebarController.getSidebarMenus);

// Get all menus (flat) — optional for UI mapping
router.get('/flat', sidebarController.getFlatSidebarMenus);

// Create a new sidebar menu
router.post(
  '/',
  validate(sidebarValidation.createSidebarMenu),
  sidebarController.createSidebarMenu
);

// Update existing menu
router.put(
  '/:id',
  validate(sidebarValidation.updateSidebarMenu),
  sidebarController.updateSidebarMenu
);

// Delete a menu
router.delete(
  '/:id',
  validate(sidebarValidation.deleteSidebarMenu),
  sidebarController.deleteSidebarMenu
);

module.exports = router;
