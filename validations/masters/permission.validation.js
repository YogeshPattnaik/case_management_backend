const Joi = require('joi');

// Validation for creating a permission
const createPermissionSchema = Joi.object({
  name: Joi.string().required(),
  route: Joi.string().optional(),         // e.g., '/users'
  icon: Joi.string().optional(),          // optional icon name
  module: Joi.string().optional(),        // e.g., 'User'
  group: Joi.string().optional(),         // group category (optional)
  actions: Joi.array()
    .items(Joi.string().valid('create', 'read', 'update', 'delete'))
    .default(['read']),
});

module.exports = {
  createPermission: Joi.object({ body: createPermissionSchema }),
};
