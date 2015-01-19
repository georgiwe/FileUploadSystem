var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userUploadSchema = new Schema({
	user: {
		type: Schema.ObjectId,
		ref: 'User',
		require: '{PATH} is required',
		required: true
	},
	filepath: {
		type: String,
		require: '{PATH} is required',
		required: true
	},
	filename: {
		type: String,
		require: '{PATH} is required',
		required: true
	},
	uploadDate: {
		type: Date,
		require: true,
		default: new Date()
	},
	extension: {
		type: String,
		require: true
	},
	private: {
		type: Boolean,
		require: '{PATH} is required', 
		required: true 
	},
	originalName: {
		type: String,
		require: '{PATH} is required',
		required: false,
	}
});

mongoose.model('UserUpload', userUploadSchema);