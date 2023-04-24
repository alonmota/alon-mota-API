// List of endpoints containing clinics
module.exports = [
	{
		name: 'Dental',
		key: null,
		url: 'https://storage.googleapis.com/scratchpay-code-challenge/dental-clinics.json',
		map: {
			name: 'name',
			state: 'stateName',
			availability: 'availability',
		},
	},
	{
		name: 'Vet',
		key: null,
		url: 'https://storage.googleapis.com/scratchpay-code-challenge/vet-clinics.json',
		map: {
			name: 'clinicName',
			state: 'stateCode',
			availability: 'opening',
		},
	},
];
