const status = require('http-status');
const ApiError = require('./ApiError.js');

class InternalServerError extends ApiError {
	constructor(message = status[status.INTERNAL_SERVER_ERROR], { cause = null } = {}) {
		super(message, { statusCode: status.INTERNAL_SERVER_ERROR, cause, isOperational: false });
	}
}

module.exports = InternalServerError;
