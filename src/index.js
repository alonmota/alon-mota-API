const app = require('./app.js');
const { config } = require('./config');
const { logger } = require('./utils');

logger.info('Starting Server');

const server = app.listen(config.port, () => {
	logger.info(`Server online, navigate to http://localhost:${config.port}/docs`);
});

const exitHandler = () => {
	if (server) {
		server.close(() => {
			logger.info('Closing Server');
			process.exit(1);
		});
	} else {
		process.exit(1);
	}
};

const unexpectedErrorHandler = (error) => {
	logger.error(error);
	exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
	logger.info('SIGTERM received');
	if (server) {
		server.close();
	}
});
