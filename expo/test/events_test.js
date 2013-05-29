require('./setup');

describe('Events', function() {
  var app;

  beforeEach(function() { app = loadFixtureApp('simple'); });

  var events = [
    'load:before',
    'initializers:before',
    'initializers:after',
    'helpers:before',
    'helpers:after',
    'routes:before',
    'routes:after',
    'load:after'
  ];

  events.forEach(function(e) {
    it("emit '"+e+"'", function(done) {
      app.on(e, function() { done(); });
      app.load();
    });
  });

  it('should emit the right sequence', function(done) {
    var emitted = [];
    events.forEach(function(e) {
      app.on(e, function() { emitted.push(e); });
    });

    app.on('load:after', function() {
      emitted.join(",").should.equal(events.join(","));
      done();
    });

    app.load();
  });
});
