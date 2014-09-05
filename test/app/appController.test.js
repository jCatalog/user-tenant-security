var Lab = require('lab');
var server = require('../../app/server');

var lab = exports.lab = Lab.script();
var describe = lab.describe;
var it = lab.it;
var expect = Lab.expect;

describe('Users', function () {
    it('main endpoint lists usernames on the network',
        function (done) {
            var options = {
                method: "GET",
                url: "/"
            };
            server.inject(options, function (response) {
                var result = response.result;

                expect(response.statusCode).to.equal(200);
                expect(result).to.be.instanceof(Array);
                expect(result).to.have.length(2);

                done();
            });
        });
});
