const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();

const OpenApiValidator = require('express-openapi-validator');

const logger = require('./utils/logger');
const swaggerSpec = require('./config/swagger/swaggerSpec');
const setupSwagger = require('./config/swagger');

const indexRouter = require('./routes/index');
const errorHandler = require('./middlewares/error.middleware');
const ApiError = require('./utils/ApiError');

const app = express();

// Enable CORS
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

// Body parsers MUST come before validator
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Logging
app.use(
  morgan('combined', {
    stream: {
      write: (message) => logger.info(message.trim()),
    },
  })
);

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Swagger UI
setupSwagger(app);

// OpenAPI Validator (after body parser)
app.use(
  OpenApiValidator.middleware({
    apiSpec: swaggerSpec,
    validateRequests: true,
    validateResponses: false,
  })
);

// Routes
app.use('/', indexRouter);

// 404 Handler
app.use((req, res, next) => {
  next(new ApiError(404, 'API Not Found'));
});

// Global Error Handler
app.use(errorHandler);

module.exports = app;
