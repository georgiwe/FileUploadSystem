require(__dirname + '/userUpload');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var encryption = require('../utilities/encryption');

var UserUpload = mongoose.model('UserUpload');

var userSchema = new Schema({
	username: { type: String, require: '{PATH} is required', unique: true, required: true },
	password: { type: String, require: '{PATH} is required', required: true, set: hashPassword },
	salt: String,
	points: Number,
	uploads: {
		type: [],
		ref: 'UserUpload',

	}
});

userSchema.path('username').validate(function (username) {
	return 
		6 >= username.length && username.length <= 20;
});

// userSchema.virtual('username.isValid').get(function () {
// 	return 6 >= this.username.length && this.username.length <= 20;
// });

userSchema.methods.authenticate = function (pass) {
	var hashedPassword = 
		encryption.generateHashedPassword(this.salt, pass);

	if (hashedPassword === this.password) {
		return true;
	}

	return false;
}

function hashPassword (password) {
	var salt = encryption.generateSalt();
	var hashedPass = 
		encryption.generateHashedPassword(salt, password);
	this.salt = salt;
	return hashedPass;
}

mongoose.model('User', userSchema);

// console.log('User initialized.');