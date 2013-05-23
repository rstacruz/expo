var ExpoSequelize = module.exports = function(app) {
  app.on('cli', function(app, cli) {
    cli
      .command('db:migrate')
      .description("Run database migrations")
      .action(function() {
        app.load(function() {
          var options = { path: app.path('migrations') };
          var migrator = app.sequelize().getMigrator(options, true);
          migrator.migrate({ method: 'up' });
        });
      });
  });

  // Loads sequelize.
  app.sequelize = function() {
    if (!app._sequelize) {
      app.log('db', 'Loading sequelize');
      app._sequelize = getSequelizeFromURL('postgres://rsc:@localhost:5432/db');
    }

    return app._sequelize;
  };
};

function getSequelizeFromURL(url) {
  match = url.match(/([^:]+):\/\/([^:]*):([^@]*)@([^:]+):(\d+)\/(.+)/);

  if (!match) throw "Wrong DATABASE_URL format";

  var Sequelize = require('sequelize');

  return new Sequelize(match[6], match[2], match[3], {
    dialect:  match[1],
    protocol: match[1],
    port:     match[5],
    host:     match[4],
    logging:  function(m) { console.log("[SQL]", m); }
  });
}
