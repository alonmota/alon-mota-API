const status = require('http-status');
const ApiError = require('./ApiError.js');

class ServiceUnavailableError extends ApiError {
	constructor(message = status[status.SERVICE_UNAVAILABLE]) {
		super(message, { statusCode: status.SERVICE_UNAVAILABLE, isOperational: false });
	}
}

module.exports = ServiceUnavailableError;
