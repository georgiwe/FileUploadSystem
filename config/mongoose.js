var mongoose = require('mongoose');
// Require these in order to initialize them
require('../models/user');
require('../models/userUpload');

var db = undefined;

function init (config) {
    mongoose.connect(config.dbConn);
    db = mongoose.connection;

    db.once('open', function(err) {
        if (err) {
            console.log('Database could not be opened: ' + err);
            return;
        }

        console.log('Database up and running.');
    });

    db.on('error', function(err){
        console.log('Database error: ' + err);
    });
}

module.exports = {
    init: init,
    db: db
};