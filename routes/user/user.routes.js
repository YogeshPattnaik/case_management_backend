/**
 * @swagger
 * tags:
 *   name: User
 *   description: User management and authentication
 */
const express = require('express');
const router = express.Router();
const userController = require('../../controllers/user/user.controller');
const validate = require('../../middlewares/validate');
const authenticate = require('../../middlewares/auth/authenticate');
const userValidation = require('../../validations/user/user.validation');
const getUploader = require('../../middlewares/uploader');

router.post(
  '/register',
  validate(userValidation.registerSchema),
  userController.register
);
router.put(
  '/complete-profile',
  authenticate,
  validate(userValidation.completeProfileSchema),
  getUploader('identification'),
  userController.completeProfile
);
router.post('/login', validate(userValidation.loginSchema), userController.login);
router.get('/sidebar', authenticate, userController.getSidebar);
router.get('/listUsers', authenticate, userController.getPaginatedUsers);
router.put('/assign-role-to-User', authenticate, validate(userValidation.assignRoleToUserSchema), userController.assignRoleToUser);

module.exports = router;
