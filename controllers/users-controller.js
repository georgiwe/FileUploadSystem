var auth = require('../config/auth');
var encryption = require('../utilities/encryption');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var UserUpload = mongoose.model('UserUpload');

var successfulRegisterMsg = 'You registered successfully.';
var invalidRegisterInfoMsg = 'Invalid registration data!';

var pageSize = 10;

function getRegisterPage (req, res, next) {
	res.render('register');
}

function registerUser (req, res, next) {
	var userData = req.body;
	console.dir(userData);
	if (!userData || userDataIsInvalid(userData)) {
		req.session.errorMessage = invalidRegisterInfoMsg;
		res.redirect('/register');
		return;
	}

	User.create(userData, function (err, user) {
		if (err) {
			req.session.errorMessage = err;
			res.redirect('/register');
			return;
		}

		req.logIn(user, function (err) {
			if (err) { console.log('user login error?!'); return next(err); } // error page

			req.session.successMessage = successfulRegisterMsg;
			res.redirect('/');
		});
	});
}

function getLoginPage (req, res, next) {
	res.render('login');
}

function loginUser (req, res, next) {
	if (req.user) {
		res.redirect('/');
	} else {
		res.redirect('/login');
	}
}

function logoutUser (req, res, next) {
	res.redirect('/');
}

function userDataIsInvalid (userData) {
	return userData.password != userData.confirmPassword;
}

function getProfilePage (req, res, next) {
	var user = req.user;
	var page = (+req.query.page - 1);

	UserUpload.find({ user: user._id })
		.skip(page * pageSize)
		.limit(pageSize)
		.exec(function (err, data) {
			var uploads = [];

			data.forEach(function (upload) {
				uploads.push({
					id: upload._id,
					filename: upload.originalName,
					extension: upload.extension,
					uploadDate: upload.uploadDate,
					isPrivate: upload.private
				});
			});

			res.render('profile', {
				uploads : uploads
			});
		});
}

module.exports = {
	getRegisterPage: getRegisterPage,
	registerUser: registerUser,
	getLoginPage: getLoginPage,
	login: loginUser,
	logout: logoutUser,
	profile: getProfilePage
};