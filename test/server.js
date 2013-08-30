var assert = require('assert');
var server = require('../lib/server');
var http = require('http');

describe('server', function() {

  before(function() {
    server.listen(8000);
  });

  it('should return 200', function(done) {
    http.get('http://localhost:8000', function(res) {
      assert.equal(200, res.statusCode);
      done();
    });
  });

  it('should return 302 for the /explain/:command', function(done) {
    http.get('http://localhost:8000/explain/ls', function(res) {
      assert.equal(302, res.statusCode);
      done();
    });
  });

  it('should parse the command to sth like "command?args=param1+param2"', function(done) {
    assert.equal('ls?args=--color=auto', server.parseCommand('ls --color=auto'))
    done();
  });

  it('should go to the explainshell.com with correct command', function(done) {
    http.get('http://localhost:8000/explain/ls%20--color=auto', function(res) {
      assert.equal('http://explainshell.com/explain/ls?args=--color=auto', res.headers.location);
      done();
    });
  });

  after(function() {
    server.close();
  });

});
