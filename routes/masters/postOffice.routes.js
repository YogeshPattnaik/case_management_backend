const express = require('express');
const router = express.Router();
const postOfficeController = require('../../controllers/masters/postOffice.controller');

// POST - Create new Post Office
router.post('/', postOfficeController.createPostOffice);

// GET - Post Offices by District
router.get('/district/:districtId', postOfficeController.getPostOfficesByDistrict);

module.exports = router;
