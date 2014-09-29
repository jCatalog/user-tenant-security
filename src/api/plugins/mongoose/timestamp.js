'use strict';

var mongoose = require('mongoose');

module.exports = function timestampPlugin(schema, options) {
    schema.add({createdAt: { type: Date, default: Date.now }});
    schema.add({modifiedAt: { type: Date, default: Date.now }});

    schema.pre('save', function (next) {
        this.modifiedAt = Date.now();
        next();
    });

    schema.pre('findByIdAndUpdate', function (next) {
        this.modifiedAt = Date.now();
        next();
    });
};
