require('./setup');

describe('Expo', function() {
  var app;

  beforeEach(function() { app = loadFixtureApp('simple'); });

  beforeEach(function() {
    app.load();
  });

  it('default environment', function() {
    app.get('env').should.equal('development');
  });

  it('default route should work (/)', function(done) {
    request(app)
      .get('/')
      .expect(200, done);
  });

  it('app.path', function() {
    var origin = path.resolve(fixturePath('simple/routes'));
    app.path('routes').should.equal(origin);
  });
});
