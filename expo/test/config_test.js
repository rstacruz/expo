require('./setup');

describe('Config files', function() {
  var app;

  beforeEach(function() { app = loadFixtureApp('simple'); });

  it('read yaml', function() {
    var data = app.conf('yaml_conf');
    data.key.should.equal('value');
  });

  it('read json', function() {
    var data = app.conf('json_conf');
    data.key2.should.equal('value2');
  });
});
