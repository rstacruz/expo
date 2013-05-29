require('./setup');

describe('Test environment', function() {
  var app;

  beforeEach(function() { app = loadFixtureApp('simple'); });

  it('load test env', function() {
    app.load('test');
    app.get('env').should.equal('test');
  });

  it('should emit load:test:before', function(done) {
    app.on('load:test:before', function() { done(); });
    app.load('test');
  });

  it('should emit load:test:after', function(done) {
    app.on('load:test:after', function() { done(); });
    app.load('test');
  });
});
