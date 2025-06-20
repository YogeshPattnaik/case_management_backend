const Joi = require('joi');

const createSidebarMenu = Joi.object({
  title: Joi.string().required(),
  path: Joi.string().allow('', null),
  icon: Joi.string().allow('', null),
  parentId: Joi.string().allow(null),
  roles: Joi.array().items(Joi.string().hex().length(24)),
  permissions: Joi.array().items(Joi.string().valid('create', 'read', 'update', 'delete')),
  sortOrder: Joi.number().optional(),
  activeStatus: Joi.boolean().default(true)
});

const updateSidebarMenu = Joi.object({
  title: Joi.string(),
  path: Joi.string().allow('', null),
  icon: Joi.string().allow('', null),
  parentId: Joi.string().allow(null),
  roles: Joi.array().items(Joi.string().hex().length(24)),
  permissions: Joi.array().items(Joi.string().valid('create', 'read', 'update', 'delete')),
  sortOrder: Joi.number(),
  activeStatus: Joi.boolean()
});

module.exports = {
  createSidebarMenu: Joi.object({ body: createSidebarMenu }),
  updateSidebarMenu: Joi.object({ body: updateSidebarMenu, params: Joi.object({ id: Joi.string().required() }) }),
  getSidebarMenuById: Joi.object({ params: Joi.object({ id: Joi.string().required() }) }),
  deleteSidebarMenu: Joi.object({ params: Joi.object({ id: Joi.string().required() }) })
};
