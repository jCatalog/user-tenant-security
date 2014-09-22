'use strict';

var Mongoose = require('mongoose');
var Config = require('../config/env/all');

//load database
Mongoose.connect('mongodb://localhost/'+ Config.mongo.database);
//Mongoose.connect('mongodb://' + Config.mongo.username + ':' + Config.mongo.password + '@' + Config.mongo.url + '/' + Config.mongo.database);
var dbInstance = Mongoose.connection;

dbInstance.on('error', console.error.bind(console, 'connection error'));
dbInstance.once('open', function callback() {
    console.log('Connection with database succeeded.');
});

module.exports = {
    Mongoose: Mongoose,
    dbInstance: dbInstance
};