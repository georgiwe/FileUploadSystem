var usersController = require('./users-controller');
var userUploadsController = require('./user-uploads-controller');
var homepageController = require('./home-controller');

module.exports = {
	users: usersController,
	uploads: userUploadsController,
	home: homepageController
};
