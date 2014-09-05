var Lab = require('lab');
var request = require('supertest');
var server = require('../../app/config/server');

var lab = exports.lab = Lab.script();

var describe = lab.describe;
var it = lab.it;
var before = lab.before;
var after = lab.after;
var expect = Lab.expect;

// Configuration
var port    = 8000;
var ip      = "0.0.0.0";
var api_url = 'http://127.0.0.1:' + port;

describe('Assets API', function () {

    before(function(done){
        server.start(ip, port, {}, function (err) {
            done();
        });
    });

    describe('[GET /] Get App', function() {
        it('should return { "name": "Mainul Islam" } on success.', function(done) {
            request(api_url)
                .get('/')
                .set('Content-Type', 'application/json; charset=utf-8')
                .end(function (err, res) {
                    if (err) throw err;
                    expect(res.statusCode).to.equal(200);
                    expect(res.body).to.have.property('name');
                    expect(res.body.name).to.equal('Mainul Islam');
                    done();
                });
        });
    });
});
