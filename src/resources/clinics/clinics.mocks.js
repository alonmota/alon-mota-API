const mockApi1 = [
	{
		name: 'Good Health Home',
		stateName: 'Alaska',
		availability: {
			from: '10:00',
			to: '19:30',
		},
	},
	{
		name: 'Mayo Clinic',
		stateName: 'Florida',
		availability: {
			from: '09:00',
			to: '20:00',
		},
	},
];

const mockApi2 = [
	{
		clinicName: 'Good Health Home',
		stateCode: 'FL',
		opening: {
			from: '15:00',
			to: '20:00',
		},
	},
	{
		clinicName: 'National Veterinary Clinic',
		stateCode: 'CA',
		opening: {
			from: '15:00',
			to: '22:30',
		},
	},
];

module.exports = {
	mockApi1,
	mockApi2,
};
