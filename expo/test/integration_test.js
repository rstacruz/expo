require('./setup');

describe('Expo integration', function() {
  var app;
  beforeEach(function() {
    app = require('express')();
    app = expo(app, fixturePath('simple'));
    require('../../expo-connect_assets')(app);
    require('../../expo-sequelize')(app);
    app.load();
  });

  it("no errors", function(done) {
    done();
  });

  describe("CLI", function() {
    var out;

    beforeEach(function() {
      out = app.cli().helpInformation();
    });

    ['assets-precompile', 'db-create', 'db-drop']
    .forEach(function(task) {
      it("have '"+task+"'", function() {
        out.indexOf(task).should.gt(1);
      });
    });
  });
});
