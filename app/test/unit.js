var Lab = require('lab');
var lab = exports.lab = Lab.script();

var describe = lab.describe;
var it = lab.it;
var before = lab.before;
var after = lab.after;
var expect = Lab.expect;

describe('math', function () {
    it('return true when 1+1 equals to 2', function (done) {
        expect(1 + 1).to.equal(2);
        done();
    });
});
