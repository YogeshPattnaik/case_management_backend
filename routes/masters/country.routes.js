const express = require('express');
const router = express.Router();
const countryController = require('../../controllers/masters/country.controller');
const validate = require("../../middlewares/validate");
const { CountryValidationSchema } = require("../../validations/masters/country.validation");

router.post('/', validate(CountryValidationSchema), countryController.createCountry);
router.get('/', countryController.getAllCountries);
router.put('/:id', validate(CountryValidationSchema), countryController.updateCountry);

module.exports = router;
