'user strict';

// dependencies
var mongoose = require('mongoose'),
    bcrypt = require('bcryptjs'),
    timestamps = require('mongoose-timestamp'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId,
    SALT_WORK_FACTOR = 10;

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
    isActive: {type: Boolean, default: false}
});

UserSchema.methods.create = function (tenant, callback) {
    if (!tenant) {
        return callback('Invalid parameter');
    }
    var schema = this;
    schema.save(function (err, user) {
        if (err) {
            return callback(err);
        }
        tenant.users.push(user._id);
        tenant.save(function (err, data) {
            if (err) return callback(err);
            return callback(null, data);
        });
    });
};

UserSchema.pre('save', function (next) {
    var user = this;

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

UserSchema.methods.comparePassword = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

UserSchema.plugin(timestamps);

// export
module.exports = mongoose.model('User', UserSchema);