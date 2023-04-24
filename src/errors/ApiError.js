const status = require('http-status');

// Base error class, make sure all errors extends from this class, as it will provide
// support to status codes and stack trace
class ApiError extends Error {
	constructor(message = 'Unexpected error', { statusCode = status.BAD_REQUEST, cause = null, isOperational = true } = {}) {
		super(message, { cause });
		this.statusCode = statusCode;
		this.isOperational = isOperational;
		Error.captureStackTrace(this, this.constructor);
	}
}

module.exports = ApiError;
