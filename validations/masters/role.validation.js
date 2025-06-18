const Joi = require('joi');
const j2s = require('joi-to-swagger');

const roleSchema = Joi.object({
    roleName: Joi.string().required(),
});


module.exports = {
    roleSchema,
    swaggerRoleMasterSchemas: {
        RoleMaster: j2s(roleSchema).swagger
    }
}