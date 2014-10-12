'use strict';

/**
 * Define Dependencies
 * @type {exports}
 */
var Mongoose = require('mongoose');
var Config = require('../config/env/all');
var junk = require('junk');

/**
 * Load Database and Models
 */
module.exports = function () {
    //load database
    Mongoose.connect('mongodb://localhost/' + Config.mongo.database);

    require('fs').readdirSync('./src/api/models').filter(junk.not).forEach(function (file) {
        require('./' + file);
    });
};