var express = require('express');

var environment = process.env.NODE_ENV || 'development';
var config = require('./config/config')[environment];

var app = express();

require('./config/express')(app, config);
require('./config/multer')(app, config);
require('./config/successHandler')(app);
require('./config/errorHandler')(app);
require('./config/mongoose').init(config);
require('./config/passport'); // maybe make it a func
require('./config/routes')(app);

app.listen(config.port);
console.log('Express server listening on port %s.', config.port);