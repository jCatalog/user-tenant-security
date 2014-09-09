'use strict';

var Lab = require('lab');
var server = require('../../app/server');

var lab = exports.lab = Lab.script();
var describe = lab.describe;
var it = lab.it;
var expect = Lab.expect;

describe('Users', function () {
    it('get the user list form the User table',
        function (done) {
            var options = {
                method: "GET",
                url: "/user"
            };
            server.inject(options, function (response) {
                var result = response.result;

                expect(response.statusCode).to.equal(200);
                expect(result).to.be.instanceof(Array);
                expect(result).to.have.length(0);

                done();
            });
        });
    it('find a user from the User table',
        function (done) {
            var options = {
                method: "GET",
                url: "/user/123"
            };
            server.inject(options, function (response) {
                var result = response.result;

                expect(response.statusCode).to.equal(200);
                expect(result).to.be.instanceof(Array);
                expect(result).to.have.length(2);

                done();
            });
        });

    it('create a user in the User table',
        function (done) {
            var options = {
                method: "POST",
                url: "/user/register",
                payload: {
                    username: "mislam",
                    email: "mainul098@gmail.com",
                    firstName: "Mainul",
                    lastName: "Islam"
                }
            };
            server.inject(options, function (response) {
                expect(response.statusCode).to.equal(200);
                done();
            });
        });
});
