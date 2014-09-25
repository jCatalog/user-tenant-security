'user strict';

// dependencies
var mongoose = require('../settings/database').Mongoose,
    timestamps = require('mongoose-timestamp'),
    Schema = mongoose.Schema,
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
    firstLogin: {type: Date},
    roleId: {type: ObjectId}
});

// timestamps
UserSchema.plugin(timestamps);

// export
module.exports = mongoose.model('User', UserSchema);