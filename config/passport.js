var passport = require('passport');
var LocalPassport = require('passport-local');
var mongoose = require('mongoose');
var User = mongoose.model('User');

passport.use(new LocalPassport(function (username, password, done) {
	User.findOne({ username: username }, function (err, user) {
		if (err) {
			console.log('Error fetching user: %s', err);
			return;
		}

		if (!user) {
			done(null, false);
			return;
		}

		var userIsAuthenticated = user.authenticate(password);

		if (userIsAuthenticated) {
			return done(null, user);
		} else {
			return done(null, false);
		}
	});
}));

passport.serializeUser(function (user, done) {
	if (user) { 
		return done(null, user._id);
	}
});

passport.deserializeUser(function (id, done) {
	User.findOne({ _id: id }, function (err, user) {
		if (err) {
			console.log('Deserializing user err: %s', err);
			return;
		}

		if (user) {
			return done(null, user);
		} else {
			return done(null, false);
		}
	})
});
