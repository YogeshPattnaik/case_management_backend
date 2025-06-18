const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('../config/swagger/swaggerSpec');

const setupSwagger = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

module.exports = setupSwagger;
