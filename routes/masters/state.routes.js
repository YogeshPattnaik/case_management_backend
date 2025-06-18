const express = require('express');
const router = express.Router();
const stateController = require('../../controllers/masters/state.controller');

// Create state
router.post('/', stateController.createState);

// Get all states for a country
router.get('/:countryId', stateController.getStatesByCountry);

module.exports = router;
