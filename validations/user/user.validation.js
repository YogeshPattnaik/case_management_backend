const Joi = require('joi');
const j2s = require('joi-to-swagger');

const registerSchema = Joi.object({
  fullName: Joi.string().required(),
  email: Joi.string().email().required(),
  mobile: Joi.string().required(),
  password: Joi.string().min(6).required(),
  confirmPassword: Joi.string().valid(Joi.ref('password')).required(),
  captcha: Joi.string().required(),
});

const completeProfileSchema = Joi.object({
  role: Joi.object({
    id: Joi.string().required(),
    name: Joi.string().required(),
  }),
  address: Joi.object({
    country: Joi.object().keys({ id: Joi.string(), name: Joi.string() }),
    state: Joi.object().keys({ id: Joi.string(), name: Joi.string() }),
    district: Joi.object().keys({ id: Joi.string(), name: Joi.string() }),
    postOffice: Joi.object().keys({ id: Joi.string(), name: Joi.string() }),
    pincode: Joi.string(),
    houseNumber: Joi.string(),
    streetNumber: Joi.string(),
    landmark: Joi.string(),
  }),
  identification: Joi.object({
    type: Joi.object({
      id: Joi.string().required(),
      name: Joi.string().required(),
    }),
    number: Joi.string().required(),
  }),
});

const loginSchema = Joi.object({
  emailOrMobile: Joi.string().required(),
  password: Joi.string().required(),
});

const assignRoleToUserSchema = Joi.object({
  roleId: Joi.string().required(),
  userId: Joi.string().required()
});

module.exports = {
  registerSchema: Joi.object({
    body: registerSchema,
  }),
  loginSchema: Joi.object({
    body: loginSchema,
  }),
  completeProfileSchema: Joi.object({
    body: completeProfileSchema,
  }),
  assignRoleToUserSchema: Joi.object({
    body: assignRoleToUserSchema,
  }),
  swaggerUserSchemas: {
    Register: j2s(registerSchema).swagger,
    Login: j2s(loginSchema).swagger,
    CompleteProfile: j2s(completeProfileSchema).swagger,
    assignRoleToUser: j2s(assignRoleToUserSchema).swagger
  }
};