var express = require('express');
var router = express.Router();

// masters API
router.use('/api/v1/masters/countries', require('./masters/country.routes'));
router.use('/api/v1/masters/states', require('./masters/state.routes'));
router.use('/api/v1/masters/districts', require('./masters/district.routes'));
router.use('/api/v1/masters/postoffices', require('./masters/postOffice.routes'));
router.use('/api/v1/masters/pincode', require('./masters/pincode.routes'));
router.use('/api/v1/masters/roles', require('./masters/role.routes'));
router.use('/api/v1/masters/identification-types', require('./masters/identificationType.route'));
router.use('/api/v1/masters/sidebar', require('./masters/sidebarMenu.route'));
router.use('/api/v1/masters/permissions', require('./masters/permission.routes'));

// user API
router.use('/api/v1/users', require('./user/user.routes'));


module.exports = router;
