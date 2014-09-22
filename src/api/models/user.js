'user strict';

// dependencies
var mongoose = require('../settings/database').Mongoose,
    timestamps = require('mongoose-timestamp'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

// schema
var UserSchema = new Schema({
    userId: {type: String, unique: true},
    firstName: {type: String, trim: true},
    lastName: {type: String, trim: true},
    email: {type: String, lowercase: true, trim: true},
    password: {type: String, select: false},
    createdBy: {type: ObjectId},
    updatedBy: {type: ObjectId},
    lastLogin: {type: Date},
    firstLogin: {type: Date},
    roleId:{type: ObjectId}
});

// timestamps
UserSchema.plugin(timestamps);

// export
module.exports = mongoose.model('User', UserSchema);