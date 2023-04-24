const express = require('express');
const helmet = require('helmet');
const compression = require('compression');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const { swagger, expressConfig } = require('./config');
const routes = require('./routes.js');
const { errorConverter, errorHandler } = require('./middlewares');
const { ResourceNotFound } = require('./errors');

const app = express();

// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// gzip compression
app.use(compression());

// enable cors
app.use(cors());
app.options('*', cors());

// Set default request params
app.use(expressConfig);

// Mount routes defined in *.route.js files
app.use('/api', routes);

// Mount doc route with swagger ui
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swagger));

// send back a 404 error for any unknown api request
app.use((req, res, next) => next(new ResourceNotFound()));

// convert errors to ApiError, if needed
app.use(errorConverter);

// handle errors
app.use(errorHandler);

module.exports = app;
