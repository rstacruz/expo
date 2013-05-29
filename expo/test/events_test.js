require('./setup');

describe('Events', function() {
  var app;

  beforeEach(function() { app = loadFixtureApp('simple'); });

  var events = [
    'load:before',
    'routes:before',
    'routes:after',
    'helpers:before',
    'helpers:after',
    'load:after'
  ];

  events.forEach(function(e) {
    it("emit '"+e+"'", function(done) {
      app.on(e, function() { done(); });
      app.load();
    });
  });
});
