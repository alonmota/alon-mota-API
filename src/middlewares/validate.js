const Joi = require('joi');
const httpStatus = require('http-status');
const { pick } = require('../utils');
const { ValidationError } = require('../errors');

const validate = (schema) => (req, res, next) => {
	const validSchema = pick(['params', 'query', 'body'])(schema);
	const object = pick(Object.keys(validSchema))(req);
	const { value, error } = Joi.compile(validSchema)
		.prefs({ errors: { label: 'key' }, abortEarly: false })
		.validate(object);

	if (error) {
		const errorMessage = error.details.map((details) => details.message).join(', ');
		return next(new ValidationError(errorMessage, httpStatus.BAD_REQUEST));
	}
	Object.assign(req, value);
	return next();
};

module.exports = validate;
