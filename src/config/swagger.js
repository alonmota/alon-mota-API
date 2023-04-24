const swaggerJsdoc = require('swagger-jsdoc');

const options = {
	definition: {
		openapi: '3.0.0',
		info: {
			title: 'Scratchpay challenge',
			version: '1.0.0',
		},
	},
	apis: ['./src/**/*.routes.js'],
};

const openApiSpecification = swaggerJsdoc(options);
module.exports = openApiSpecification;
