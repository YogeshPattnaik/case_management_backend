const express = require('express');
const router = express.Router();
const pincodeController = require('../../controllers/masters/pincode.controller');

// GET - Location data by Pincode
router.get('/:pincode', pincodeController.getLocationByPincode);

module.exports = router;
