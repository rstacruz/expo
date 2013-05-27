describe('App', function() {
  beforeEach(require('./setup'));

  it('Homepage should work', function(done) {
    request(app)
      .get('/')
      .expect(200, done);
  });

  it('should have the right env', function() {
    app.get('env').should.equal('test');
  });
});
