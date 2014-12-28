var controllers = require('../controllers');
var auth = require('./auth');

module.exports = function (app) {

    app.get('/', controllers.home.loadHomescreen);

    app.get('/register', controllers.users.getRegisterPage);
    app.post('/register', controllers.users.registerUser);

    app.get('/login', controllers.users.getLoginPage);
    app.post('/login', auth.login, controllers.users.login);

    app.get('/logout', auth.logout, controllers.users.logout);

    app.get('/upload', auth.authCheck, controllers.uploads.getUploadsPage);
    app.post('/upload', auth.authCheck, controllers.uploads.uploadFiles);

    app.get('/profile', auth.authCheck, controllers.users.profile);

    app.delete('/delete', auth.authCheck, controllers.uploads.delete);

    app.get('/download', controllers.uploads.download);

    app.put('/aterprivacy', auth.authCheck, controllers.uploads.alter);
}