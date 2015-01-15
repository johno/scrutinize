var assert = require('assert');
var scrutinize = require('..');

describe('scrutinize', function() {

  it('should do something awesome', function(done) {
    this.timeout(60000);
    scrutinize('furtive.co', { verbose: true }, function(data) {
      done();
    });
  });
});
