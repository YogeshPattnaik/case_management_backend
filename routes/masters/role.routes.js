const express = require('express');
const router = express.Router();
const roleController = require('../../controllers/masters/role.controller');
const validate = require('../../middlewares/validate');
const roleValidation = require('../../validations/masters/role.validation');

router.post('/', validate(roleValidation.createRole), roleController.createRole);
router.get('/', roleController.getAllRoles);

module.exports = router;
