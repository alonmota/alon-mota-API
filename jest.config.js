module.exports = {
	testEnvironment: 'node',
	testEnvironmentOptions: {
		NODE_ENV: 'test',
	},
	collectCoverageFrom: [
		'src/resources/**/*.services.js', // As a demo, this project is only collecting coverage from services
		'!<rootDir>/node_modules/',
	],
	restoreMocks: true,
	coveragePathIgnorePatterns: ['node_modules', 'src/config'],
	coverageReporters: ['text', 'lcov', 'clover', 'html'],
	collectCoverage: true,
	coverageThreshold: {
		global: {
			lines: 95,
		},
	},
	transform: {},
	resetMocks: true,
};
