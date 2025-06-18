const express = require('express');
const router = express.Router();
const controller = require('../../controllers/masters/rolePermission.controller');

router.get('/:roleId', controller.getPermissionsByRole);
router.post('/', controller.assignPermissionsToRole);

module.exports = router;
