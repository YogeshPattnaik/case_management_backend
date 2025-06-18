const express = require('express');
const router = express.Router();
const countryController = require('../../controllers/masters/country.controller');

router.post('/', countryController.createCountry);
router.get('/', countryController.getAllCountries);

module.exports = router;
