var mongoose = require('mongoose');
var User = mongoose.model('User');
var UserUpload = mongoose.model('UserUpload');
var fs = require('fs');

var uploadCompleteMsg = 'File(s) uploaded successfully!';
var noFilesSelectedMsg = 'Please select files to upload.';
var fileNotFoundMsg = 'File not found.';
var fileNotYoursMsg = 'You can only download files you uploaded and pulbic files.';
var uknownFileDownloadErrorMsg = 'Unknown file download error occured';
var cantDeleteOtherPeoplesFilesMsg = 'You can only delete your own files.';

function getUploadsPage (req, res, next) {
	res.render('uploads');
}

function uploadFiles (req, res, next) {
	var files = req.files;
	var user = req.user;

	if (!Object.keys(files).length) {
		req.session.errorMessage = noFilesSelectedMsg;
		res.redirect('upload');
	}

	var uploads = [];

	for(var prop in files) {

		var file = files[prop];
		var fileNum = file.fieldname.replace(/\D/g, '');
		var isPrivate = (req.body['isprivate' + fileNum]) ? true : false;

		var fileData = {
			user: user._id,
			filepath: file.path,
			private: isPrivate,
			filename: file.name,
			extension: file.extension,
			uploadDate: new Date(),
			originalName: file.originalname.replace(/\.\w+$/, '')
		};

		uploads.push(fileData);
	}

	UserUpload.create(uploads, function (err) {
		if (err) {
			// add error page here
			console.log(err);
			return;
		}

		res.redirect('/profile');
	});
}

function deleteUpload (req, res, next) {
	var id = req.body.id;

	UserUpload.findOne({ _id: id }).exec(function (err, file) {

		if (file)
			var fileUserObjId = file.user.toString();
		if(req.user)
			var currUserObjId = req.user._id.toString();

		if (!file) {
			req.session.errorMessage = fileNotFoundMsg;
		} else if (fileUserObjId !== currUserObjId) {
			req.session.errorMessage = cantDeleteOtherPeoplesFilesMsg;
		} else {
			// console.log(typeof(file));
			UserUpload.findOne({ _id: file._id }).remove().exec();
			req.session.successMessage = 'File deleted';
			fs.unlink(file.filepath);
		}

		res.status(200).end();
	});
}

function download (req, res, next) {
	var id = req.query.id;

	UserUpload.findOne({ _id: id }).exec(function (err, file) {
		if (err) {
			req.session.errorMessage = fileNotFoundMsg;
			// error page?
			res.status(400).end();
			return;
		}

		if (!file) {
			req.session.errorMessage = fileNotFoundMsg;
			res.status(404).end();
			return;
		}

		if (req.user){
			var currUserObjId = req.user._id.toString();
		}

		var fileUserObjId = file.user.toString();

		if (!file.private || (fileUserObjId === currUserObjId)) {
			var downloadFilename = file.originalName + '.' + file.extension;
			res.download(file.filepath, downloadFilename, function (err) {
				if (err) {
					req.session.errorMessage = uknownFileDownloadErrorMsg;
					res.status(400).end();
				}
			});
			return;
		} else if (fileUserObjId !== currUserObjId) {
			req.session.errorMessage = fileNotYoursMsg;
			res.redirect('/profile');
			return;
		}
	});
}

function aterprivacy (req, res, next) {
	var id = req.body.id;

	UserUpload.findOne({ _id: id }).exec(function (err, result) {
		if (err) {
			// error page or next or whatever
			console.log(err);
			return;
		}

		result.private = !result.private;
		result.save(function (err) {
			if (err) {
				// handle error
				return;
			}

			req.session.successMessage = 'Privacy for file changed.';
			res.status(200).end();
		});
	});
}

module.exports = {
	getUploadsPage: getUploadsPage,
	uploadFiles: uploadFiles,
	delete: deleteUpload,
	download: download,
	alter: aterprivacy
};