const express = require('express');
const router = express.Router();
const controller = require('../../controllers/master/permission.controller');

// GET all permissions
router.get('/', controller.getAllPermissions);

// POST create new permission
router.post('/', controller.createPermission);

module.exports = router;
