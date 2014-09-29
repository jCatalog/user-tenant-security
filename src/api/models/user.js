'user strict';

// dependencies
var db = require('../settings/database').db,
    timestamps = require('mongoose-timestamp'),
    Schema = require('mongoose').Schema,
    ObjectId = Schema.ObjectId;

// schema
var UserSchema = new Schema({
    userId: {type: String, unique: true, min: 3, max: 20},
    firstName: {type: String, trim: true, min: 3, max: 20},
    lastName: {type: String, trim: true, min: 3, max: 20},
    email: {type: String, lowercase: true, trim: true, min: 5, max: 50},
    password: {type: String, select: false, min: 5, max: 50},
    createdBy: {type: ObjectId},
    updatedBy: {type: ObjectId},
    lastLogin: {type: Date},
    firstLogin: {type: Date}
});

// timestamps
UserSchema.plugin(timestamps);

// export
module.exports = db.model('User', UserSchema);