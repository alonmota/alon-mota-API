// Set default headers for application
module.exports = (req, res, next) => {
	res.setHeader('Content-Type', 'application/json');
	return next();
};
