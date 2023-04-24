const Joi = require('joi');

const filter = {
	query: Joi.object().keys({
		name: Joi.string(),
		state: Joi.string(),
		availability: Joi.string()
			.regex(/(^([0-9]{2}):([0-9]{2})$)|(^from:([0-9]{2}):([0-9]{2}), to:([0-9]{2}):([0-9]{2})$)/)
			.message('"availability" must be in format "HH:mm" or "from:HH:mm, to:HH:mm"'),
	}),
};

module.exports = {
	filter,
};
