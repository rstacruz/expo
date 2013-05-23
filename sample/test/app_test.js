require('./test_helper');
describe('GET /users', function() {
  it('should work', function(done) {
    request(app)
      .get('/users')
      .expect(200, done);
  });
});
