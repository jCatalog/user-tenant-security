'use strict';
var bcrypt = require('bcryptjs'),
    mongoose = require('mongoose'),
    SALT_WORK_FACTOR = 10;

module.exports = function encryptPlugin(schema, options) {
    schema.add({createdAt: { type: Date, default: Date.now }});
    schema.add({modifiedAt: { type: Date, default: Date.now }});

    schema.pre('save', function (next) {
        this.modifiedAt = Date.now();
        var user = this;

        // only hash the password if it has been modified (or is new)
        if (!user.isModified('password')) return next();

        // generate a salt
        bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
            if (err) return next(err);

            // hash the password using our new salt
            bcrypt.hash(user.password, salt, function(err, hash) {
                if (err) return next(err);

                // override the cleartext password with the hashed one
                user.password = hash;
                next();
            });
        });
    });

    schema.methods.comparePassword = function(candidatePassword, cb) {
        bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
            if (err) return cb(err);
            cb(null, isMatch);
        });
    };
};