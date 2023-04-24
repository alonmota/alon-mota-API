const { ApiError } = require('../errors');

const errorConverter = (err, req, res, next) => {
	let error = err;
	if (!(error instanceof ApiError)) error = new ApiError(err.message, { cause: err });
	return next(error);
};

module.exports = errorConverter;
