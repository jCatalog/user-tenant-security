'use strict';

function MongoDbBackend(db) {
    this.db = db;
};

MongoDbBackend.prototype = {
    add: function (bucket, key, values, cb) {
        values = makeArray(values);
        this.db.collection(bucket, function (err, collection) {
            if (err instanceof Error) return cb(err);
            // build doc from array values
            var doc = {};
            values.forEach(function (value) {
                doc[value] = true;
            });

            // update document
            collection.update(key, {$set: doc}, {safe: true, upsert: true}, function (err) {
                if (err instanceof Error) return cb(err);
                cb(undefined);
            });
        });
    },
    remove: function (bucket, key, values, cb) {
        values = makeArray(values);
        this.db.collection(bucket, function (err, collection) {
            if (err instanceof Error) return cb(err);
            // build doc from array values
            var doc = {};
            values.forEach(function (value) {
                doc[value] = true;
            });
            // update document
            collection.update(key, {$unset: doc}, {safe: true, upsert: true}, function (err) {
                if (err instanceof Error) return cb(err);
                cb(undefined);
            });
        });
    },
    get: function (bucket, key, cb) {

    },
    union: function (bucket, keys, cb) {
    },
    del: function (bucket, keys) {
    }
};

function makeArray(arr) {
    return Array.isArray(arr) ? arr : [arr];
}

exports = module.exports = MongoDbBackend;