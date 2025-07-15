const {
  swaggerRoleMasterSchemas,
} = require('../../validations/masters/role.validation');
const {
  swaggerUserSchemas,
} = require('../../validations/user/user.validation');
const {
  swaggerMasterSchema,
} = require('../../validations/masters/swaggerMasterSchema');

const swaggerSpec = {
  openapi: '3.0.0',
  info: {
    title: 'Case Management API',
    version: '1.0.0',
    description: 'All endpoints documented automatically',
  },
  servers: [{ url: `http://localhost:${process.env.PORT || 5000}/api/v1` }],
  paths: {
    // users API List
    '/users/login': {
      post: {
        tags: ['User'],
        summary: 'Login',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Login',
              },
            },
          },
        },
        responses: {
          200: { description: 'Login success' },
          401: { description: 'Invalid credentials' },
        },
      },
    },
    '/users/register': {
      post: {
        tags: ['User'],
        summary: 'Register',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Register',
              },
            },
          },
        },
        responses: {
          201: { description: 'User created' },
          400: { description: 'Validation error' },
        },
      },
    },
    '/users/complete-profile': {
      put: {
        tags: ['User'],
        summary: 'Complete user profile',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/CompleteProfile',
              },
            },
          },
        },
        responses: {
          200: { description: 'Profile completed' },
        },
      },
    },
    '/users/me': {
      get: {
        tags: ['User'],
        summary: 'Get current user by ID',
        responses: {
          200: { description: 'User data' },
        },
        security: [{ bearerAuth: [] }],
      },
    },
    '/users/sidebar': {
      get: {
        tags: ['User'],
        summary: 'get sidebar according to user and roleId',
        responses: {
          200: { description: 'User data' },
        },
        security: [{ bearerAuth: [] }],
      },
    },
    '/users/listUsers': {
      get: {
        tags: ['User'],
        summary: 'get List of users with pagination',
        responses: {
          200: { description: 'User data' },
        },
        security: [{ bearerAuth: [] }],
      },
    },
    '/users/assign-role-to-User': {
      put: {
        tags: ['User'],
        summary: 'Assign role to the user',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/assignRoleToUser',
              },
            },
          },
        },
        responses: {
          200: { description: 'Role Assigned to the User' },
        },
      },
    },

    // masters API list
    '/masters/countries': {
      get: {
        tags: ['Master'],
        summary: 'Get countries',
        responses: { 200: { description: 'Countries list' } },
      },
      post: {
        tags: ['Master'],
        summary: 'Create Country',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Country',
              },
            },
          },
        },
        responses: {
          200: { description: 'Country Created' },
        },
      },
    },
    '/masters/countries/{id}': {
      put: {
        tags: ['Master'],
        summary: 'Update Country (name, isoCode, activeStatus)',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'string' },
          },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Country' },
            },
          },
        },
        responses: {
          200: { description: 'Country updated' },
          404: { description: 'Country not found' },
        },
      },
    },
    '/masters/states': {
      get: {
        tags: ['Master'],
        summary: 'Get states',
        parameters: [
          {
            name: 'countryId',
            in: 'query',
            required: true,
            description:
              'MongoDB ObjectId of the country for which states are to be fetched',
            schema: {
              type: 'string',
              example: '685185ae0d1a2e1e3f7b8089',
            },
          },
        ],
        responses: { 200: { description: 'States list' } },
      },
      post: {
        tags: ['Master'],
        summary: 'Create State',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/State' },
            },
          },
        },
        responses: {
          201: { description: 'State created' },
        },
      },
    },
    '/masters/districts': {
      get: {
        tags: ['Master'],
        summary: 'Get districts',
        responses: { 200: { description: 'Districts list' } },
      },
    },
    '/masters/post-offices': {
      get: {
        tags: ['Master'],
        summary: 'Get post offices',
        responses: { 200: { description: 'Post offices list' } },
      },
    },
    '/masters/roles': {
      get: {
        tags: ['Master'],
        summary: 'Get roles',
        responses: { 200: { description: 'Roles list' } },
      },
    },
    '/masters/identification-types': {
      get: {
        tags: ['Master'],
        summary: 'Get identification types',
        responses: { 200: { description: 'ID types list' } },
      },
    },
    '/masters/pincode/{pincode}': {
      get: {
        tags: ['Master'],
        summary: 'Get location by pincode',
        parameters: [
          {
            name: 'pincode',
            in: 'path',
            required: true,
            schema: { type: 'string' },
          },
        ],
        responses: { 200: { description: 'Location data' } },
      },
    },
    '/masters/permissions': {
      get: {
        tags: ['Master'],
        summary: 'Get permission list',
        responses: { 200: { description: 'Permission list' } },
      },
    },
    '/masters/sidebar': {
      get: {
        tags: ['Master'],
        summary: 'Get identification types',
        responses: { 200: { description: 'ID types list' } },
        security: [{ bearerAuth: [] }],
      },
    },
    '/masters/sidebar/flat': {
      get: {
        tags: ['Master'],
        summary: 'Get identification types',
        responses: { 200: { description: 'ID types list' } },
        security: [{ bearerAuth: [] }],
      },
    },
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
    schemas: {
      // user schemas
      Login: swaggerUserSchemas.Login,
      Register: swaggerUserSchemas.Register,
      CompleteProfile: swaggerUserSchemas.CompleteProfile,
      assignRoleToUser: swaggerUserSchemas.assignRoleToUser,

      // master schemas
      Country: swaggerMasterSchema.Country,
      State: swaggerMasterSchema.State
    },
  },
};

module.exports = swaggerSpec;
