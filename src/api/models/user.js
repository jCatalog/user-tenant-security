'user strict';

// dependencies
var mongoose = require('mongoose'),
    encrypt = require('../plugins/mongoose/encrypt'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

// schema
var UserSchema = new Schema({
    userId: {type: String, unique: true, required: true, min: 3, max: 20},
    firstName: {type: String, trim: true, required: true, min: 3, max: 20},
    lastName: {type: String, trim: true, required: true, min: 3, max: 20},
    email: {type: String, lowercase: true, trim: true, required: true, min: 5, max: 50},
    password: {type: String, select: false, min: 5, required: true, max: 50},
    createdBy: {type: ObjectId},
    updatedBy: {type: ObjectId},
    lastLogin: {type: Date},
    firstLogin: {type: Date},
    isActive: {type: Boolean, default: false},
    tenantId: {type: ObjectId, ref: 'Tenant'}
});

UserSchema.plugin(encrypt);

// export
module.exports = mongoose.model('User', UserSchema);