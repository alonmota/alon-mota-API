const status = require('http-status');
const ApiError = require('./ApiError.js');

class ValidationError extends ApiError {
	constructor(message) {
		super(message, { statusCode: status.BAD_REQUEST });
	}
}

module.exports = ValidationError;
