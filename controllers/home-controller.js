var mongoose = require('mongoose');
var User = mongoose.model('User');
var UserUpload = mongoose.model('UserUpload');

var pageSize = 10;

function loadHomescreen (req, res, next) {
	User.count().exec(function (err, userCount) {
		if (err) {
			// err page
			console.log(err);
			return;
		}

		UserUpload.count().exec(function (err, uploadsCount) {
			if (err) {
				// err page
				console.log(err);
				return;
			}

			var reqPage = req.query.page;
			var skip = (reqPage - 1) * pageSize;

			UserUpload.find({ private: false })
				.skip(skip)
				.limit(pageSize)
				.exec(function (err, uploads) {
					if (err) {
						// err page
						console.log(err);
						return;
					}

					res.render('home', { 
						stats: {
							registeredUsersCount: userCount,
							uploadedFilesCount: uploadsCount
						},
						uploads: uploads
					});
				});
		});
	});
}

module.exports = {
	loadHomescreen: loadHomescreen
};