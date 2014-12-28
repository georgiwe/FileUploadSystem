module.exports = function (app) {
	app.use(function (req, res, next) {
		if (req.session.successMessage) {
			app.locals.successMessage = req.session.successMessage;
			delete req.session.successMessage;
		} else {
			delete app.locals.successMessage;
		}

		next();
	});

	// console.log('Success handler initialized.');
}