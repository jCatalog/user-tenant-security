var Joi = require('joi');
var Mongoose = require('../settings/database').Mongoose;

//create the schema
var userSchema = new Mongoose.Schema({
    firstName: {
        type: String,
        trim: true,
        default: ''
    },
    lastName: {
        type: String,
        trim: true,
        default: ''
    },
    displayName: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        trim: true,
        default: ''
    },
    username: {
        type: String,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        default: ''
    },
    salt: {
        type: String
    },
    updated: {
        type: Date
    },
    created: {
        type: Date,
        default: Date.now
    }
});

//create the model
var User = Mongoose.model('User', userSchema, 'Users');

module.exports = User;