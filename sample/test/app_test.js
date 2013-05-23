require('./test_helper');

describe('App', function() {
  it('Homepage should work', function(done) {
    request(app)
      .get('/')
      .expect(200, done);
  });

  it('Homepage should work', function(done) {
    request(app)
      .get('/')
      .expect(200, done);
  });

  it('should have the right env', function() {
    app.get('env').should.equal('test');
  });
});
