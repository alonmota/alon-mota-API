const status = require('http-status');
const ApiError = require('./ApiError.js');

class ResourceNotFound extends ApiError {
	constructor(message = status[status.NOT_FOUND]) {
		super(message, { statusCode: status.NOT_FOUND });
	}
}

module.exports = ResourceNotFound;
