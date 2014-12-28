var express = require('express'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    passport = require('passport'),
    multer = require('multer');

var secret = process.env.SESSION_SECRET || 'some other secret';

module.exports = function (app, config) {
    app.set('view engine', 'jade');
    app.set('views', config.rootPath + '/views');

    app.use(express.static(config.rootPath + '/public'));

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));

    app.use(cookieParser());

    app.use(session({resave: true, saveUninitialized: true, secret: secret}));
    
    app.use(passport.initialize());
    app.use(passport.session());

    app.use(function (req, res, next) {
        if (req.user) {
            app.locals.userData = req.user;
        } else {
            app.locals.userData = undefined;
        }

        next(null);
    });
};