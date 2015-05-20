'user strict';

/**
 * Define Dependencies
 * @type {exports}
 */
var mongoose = require('mongoose'),
    bcrypt = require('bcryptjs'),
    timestamps = require('mongoose-timestamp'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId,
    SALT_WORK_FACTOR = 10;

/**
 * Define User Schema
 * @type {Schema}
 */
var UserSchema = new Schema({
    username: {type: String, unique: true, required: true, min: 3, max: 20},
    firstName: {type: String, trim: true, required: true, min: 3, max: 20},
    lastName: {type: String, trim: true, required: true, min: 3, max: 20},
    email: {type: String, lowercase: true, trim: true, required: true, min: 5, max: 50},
    password: {type: String, select: false, min: 5, required: true, max: 50},
    createdBy: {type: ObjectId, required: true},
    updatedBy: {type: ObjectId, required: true},
    lastLogin: {type: Date},
    firstLogin: {type: Date},
    tenantId: {type: ObjectId, ref: 'Tenant'},
    isActive: {type: Boolean, default: false}
});

/**
 * Create method for User
 * @param tenant
 * @param callback
 * @returns {*}
 */
UserSchema.methods.create = function (tenant, task, callback) {
    'use strict';
    if (!tenant) {
        return callback('Invalid parameter');
    }
    var schema = this;
    schema.tenantId = tenant._id;
    if(task == 'signup')
    {
       schema.createdBy = schema._id;
       schema.updatedBy = schema._id;
    }    
    schema.save(function (err, user) {
        if (err) {
            return callback(err);
        }
        if(task == 'signup')
        {    
            tenant.createdBy = user._id;
            tenant.updatedBy = user._id;
        }    
        tenant.users.push(user._id);
        tenant.save(function (err, data) {
            if (err) {
                schema.remove(function(){});
                return callback(err);
            }
            return callback(null, user);
        });
    });
};

/**
 * Enforce password encryption before saving a User information
 */
UserSchema.pre('save', function (next) {
    'use strict';
    var user = this;
    //user.updatedBy = user._id;
    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

/**
 * Password verification
 * @param candidatePassword
 * @param cb
 */
UserSchema.methods.comparePassword = function (candidatePassword, cb) {
    'use strict';
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

UserSchema.plugin(timestamps);

/**
 * Export User Model
 */
module.exports = mongoose.model('User', UserSchema);