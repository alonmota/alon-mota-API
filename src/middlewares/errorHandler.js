const httpStatus = require('http-status');
const { config } = require('../config');
const { logger } = require('../utils');

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
	let { statusCode, message } = err;

	// Hide server errors from end users
	if (config.env === 'production' && !err.isOperational) {
		statusCode = httpStatus.INTERNAL_SERVER_ERROR;
		message = httpStatus[httpStatus.INTERNAL_SERVER_ERROR];
	}

	if (config.env === 'development') {
		logger.error(err);
	}

	res.status(statusCode).send({
		code: statusCode,
		message,
	});
};

module.exports = errorHandler;
