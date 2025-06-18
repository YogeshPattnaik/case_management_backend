const express = require('express');
const router = express.Router();
const districtController = require('../../controllers/masters/district.controller');

// Create district
router.post('/', districtController.createDistrict);

// Get all districts for a state
router.get('/:stateId', districtController.getDistrictsByState);

module.exports = router;
