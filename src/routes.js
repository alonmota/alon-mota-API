const { Router } = require('express');
const { glob } = require('glob');
const path = require('path');
const { logger } = require('./utils');

const router = Router();

// Health check endpoint to check api availability
router.get('/status', (req, res) => res.send('OK'));

/**
* Mounts routes from all <NAME>.routes.js inside src folder, and bind them under NAME endpoint
* @example
*   /resource/folderName/routeName.route.js routes will be mounted under /api/routeName endpoints
*/
async function mountRoutes() {
	// Route definitions
	const files = glob.sync('*.routes.js', { matchBase: true, cwd: './src', dotRelative: true });

	// Mount routes for each resource
	files.forEach(async (routeFilename) => {
		// eslint-disable-next-line import/no-dynamic-require, global-require
		const routes = await import(`./${routeFilename}`);

		// Create the url using the first part of the filename
		// e.g. auth.route.js will generate /auth
		const routeName = path.basename(routeFilename, '.routes.js');
		const url = `/${routeName}`;

		// Mount the routes
		logger.info(`${path.basename(routeFilename)} -> ${url}`);
		router.use(url, routes.default);
	});
}

// Mount routes defined in *.route.js files
(async () => {
	await mountRoutes();
})();

module.exports = router;
