var path = require('path');
var rootPath = path.normalize(__dirname + '/../');

module.exports = {
    development: {
        rootPath: rootPath,
        dbConn: 'mongodb://localhost:27017/fileuploadsystem',
        uploadsPath: path.normalize(rootPath + '/uploads/'),
        port: process.env.PORT || 1234
    }
}