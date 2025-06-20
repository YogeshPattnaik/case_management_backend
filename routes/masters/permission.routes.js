const express = require('express');
const router = express.Router();
const validate = require('../../middlewares/validate');
const authenticate = require('../../middlewares/auth/authenticate');
const controller = require('../../controllers/master/permission.controller');
const permissionValidation = require('../../validations/masters/permission.validation');

router.use(authenticate)

// GET all permissions
router.get('/', controller.getAllPermissions);

// POST create new permission
router.post('/', 
    validate(permissionValidation.createPermission),
    controller.createPermission);

module.exports = router;
