const express = require('express');
const router = express.Router();
const identificationTypeController = require('../../controllers/masters/identificationType.controller');
const validate = require('../../middlewares/validate');
const validation = require('../../validations/masters/identificationType.validation');

router.post('/', validate(validation.createIdentificationType), identificationTypeController.create);
router.get('/', identificationTypeController.getAll);

module.exports = router;
