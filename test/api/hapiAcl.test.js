'use strict';

var Lab = require('lab');
var acl = require('../../src/api/util/hapi-acl');
var Mongoose = require('mongoose');
var Config = require('../../src/api/config/env/all');

var lab = exports.lab = Lab.script();
var describe = lab.describe;
var it = lab.it;
var expect = Lab.expect;

describe('Hapi ACL', function () {
    it('Add roles for a user',
        function (done) {
            Mongoose.connect('mongodb://localhost/' + Config.mongo.database);
            var Acl = new acl(new acl.mongoDbBanckend(Mongoose.connection.db));
            Acl.addUserRoles('mislam', 'admin', function (err) {
                expect(!err);
                done();
            });
        });
});
