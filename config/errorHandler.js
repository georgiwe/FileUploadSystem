module.exports = function (app) {
	app.use(function (req, res, next) {
		if (req.session.errorMessage) {
			app.locals.errorMessage = req.session.errorMessage;
			delete req.session.errorMessage;
		} else {
			delete app.locals.errorMessage;
		}

		next();
	});

	// console.log('Error handler initialized.');
}