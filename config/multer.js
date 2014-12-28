var multer = require('multer');

module.exports = function (app, config) {
	app.use(multer({ dest: config.uploadsPath}));
}