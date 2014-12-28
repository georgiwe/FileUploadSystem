var passport = require('passport');

function login (req, res, next) {
	passport.authenticate('local', function(err, user, info) {
		if (err) { return next(err); }

		if (!user) { 
			req.session.errorMessage = 'Invalid username or password.';
			return res.redirect('/login'); 
		}

		req.logIn(user, function(err) {
			if (err) { return next(err); }

			return res.redirect('/');
		});

	})(req, res, next);
}

function logout (req, res, next) {
	req.logout();
	res.redirect('/');
}

function authCheck (req, res, next) {
	if (!req.isAuthenticated()) {
		res.redirect('/login');
	}
	else {
		next();
	}
}

module.exports = {
	login: login,
	logout: logout,
	authCheck: authCheck
};