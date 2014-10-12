'use strict';

var mongoose = require('mongoose');
var junk = require('junk');

module.exports = function (mongodbURL) {
    //load database
    mongoose.connect(mongodbURL, function (err) {
        if (err) {
            console.error('Failed to connect to the database');
        }
    });

    require('fs').readdirSync('./src/api/models').filter(junk.not).forEach(function (file) {
        require('./' + file);
    });
    return mongoose.connection;
};
