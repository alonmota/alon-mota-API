const axios = require('axios');
const httpStatus = require('http-status');
const { clinicApis } = require('../../config');
const { ServiceUnavailableError } = require('../../errors');
const { ValidationError } = require('../../errors');
const { states } = require('../../utils');

let allClinics;

// Ideally this method should run periodically and stored in a database.
// A database would allow the creation of indexes to speed up the search
// would also allow the consumption of partial results te reduce memory usage
// would also allow the creation of images on the database for the most used queries
async function fetchClinicsFromProviders() {
	const loadClinics = clinicApis.map(async (api) => {
		try {
			const response = await axios.get(api.url, { timeout: 2000 });
			return response.data.map((item) => ({
				name: item[api.map.name],
				state: item[api.map.state],
				availability: item[api.map.availability],
			}));
		} catch (error) {
			throw new ServiceUnavailableError();
		}
	});
	const response = await Promise.allSettled(loadClinics);
	const clinics = response.filter((x) => x.status === 'fulfilled').map((x) => x.value);
	if (clinics.length === 0) throw new ServiceUnavailableError();
	allClinics = [].concat(...clinics);
	return allClinics;
}

function filterClinics(clinics, filter) {
	return clinics.filter((item) => {
		let match = true;
		// Every clinic should pass all filters in order to be considered for return
		if (filter.name && !item.name.toLowerCase().includes(filter.name.toLowerCase())) {
			match = false;
		}
		if (filter.state && !(item.state === filter.state || item.state === states[filter.state])) {
			match = false;
		}
		if (filter.availability) {
			if (
				filter.availability.match(/^([0-9]{2}):([0-9]{2})$/) // If contains filter availability in format HH:mm and does not match
				&& (
					item.availability.from > filter.availability
					|| item.availability.to < filter.availability
				)
			) {
				match = false;
			} else if (filter.availability.match(/^from:([0-9]{2}):([0-9]{2}), to:([0-9]{2}):([0-9]{2})$/)) {
				const from = filter.availability.slice(5, 10);
				const to = filter.availability.slice(15);
				if (from >= to) throw new ValidationError('Filter "availability.from" must be smaller that "availability.to"');
				if (item.availability.from > from || item.availability.to < to) {
					match = false;
				}
			}
		}
		return match;
	});
}

async function getClinics(req, res, next) {
	try {
		// Request clinics from all providers
		const clinics = await fetchClinicsFromProviders();

		// Filter clinics by query filters
		const clinicsThatMatch = filterClinics(clinics, req.query);

		return res.status(httpStatus.OK).send(clinicsThatMatch);
	} catch (error) {
		return next(error);
	}
}

module.exports = {
	getClinics,
};
