const { swaggerRoleMasterSchemas } = require('../../validations/masters/role.validation');
const { swaggerUserSchemas } = require('../../validations/user/user.validation');

const swaggerSpec = {
  openapi: '3.0.0',
  info: {
    title: 'Case Management API',
    version: '1.0.0',
    description: 'All endpoints documented automatically'
  },
  servers: [{ url: `http://localhost:${process.env.PORT || 5000}/api/v1` }],
  paths: {
    '/users/login': {
      post: {
        tags: ['User'],
        summary: 'Login',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Login'
              }
            }
          }
        },
        responses: {
          200: { description: 'Login success' },
          401: { description: 'Invalid credentials' }
        }
      }
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
                $ref: '#/components/schemas/Register'
              }
            }
          }
        },
        responses: {
          201: { description: 'User created' },
          400: { description: 'Validation error' }
        }
      }
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
                $ref: '#/components/schemas/CompleteProfile'
              }
            }
          }
        },
        responses: {
          200: { description: 'Profile completed' }
        }
      }
    },
    '/users/me': {
      get: {
        tags: ['User'],
        summary: 'Get current user by ID',
        responses: {
          200: { description: 'User data' }
        },
        security: [{ bearerAuth: [] }]
      }
    },
    '/masters/countries': {
      get: {
        tags: ['Master'],
        summary: 'Get countries',
        responses: { 200: { description: 'Countries list' } }
      }
    },
    '/masters/states': {
      get: {
        tags: ['Master'],
        summary: 'Get states',
        responses: { 200: { description: 'States list' } }
      }
    },
    '/masters/districts': {
      get: {
        tags: ['Master'],
        summary: 'Get districts',
        responses: { 200: { description: 'Districts list' } }
      }
    },
    '/masters/post-offices': {
      get: {
        tags: ['Master'],
        summary: 'Get post offices',
        responses: { 200: { description: 'Post offices list' } }
      }
    },
    '/masters/roles': {
      get: {
        tags: ['Master'],
        summary: 'Get roles',
        responses: { 200: { description: 'Roles list' } }
      }
    },
    '/masters/identification-types': {
      get: {
        tags: ['Master'],
        summary: 'Get identification types',
        responses: { 200: { description: 'ID types list' } }
      }
    },
    '/masters/pincode/{pincode}': {
      get: {
        tags: ['Master'],
        summary: 'Get location by pincode',
        parameters: [{
          name: 'pincode',
          in: 'path',
          required: true,
          schema: { type: 'string' }
        }],
        responses: { 200: { description: 'Location data' } }
      }
    }
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer'
      }
    },
    schemas: {
        Login: swaggerUserSchemas.Login,
        Register: swaggerUserSchemas.Register,
        CompleteProfile: swaggerUserSchemas.CompleteProfile
    }
  }
};

module.exports = swaggerSpec;
