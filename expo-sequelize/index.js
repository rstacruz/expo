var ExpoSequelize = module.exports = function(app) {
  app.on('cli', function(app, cli) {
    cli
      .command('db:migrate')
      .description("Run database migrations")
      .action(function() {
      });
  });

  app.sequelize = function() {
    if (!app._sequelize) {
      app.log('db', 'Setting sequel');
      app._sequelize = getSequelizeFromURL('postgres://rsc:@localhost:5432/db');
    }

    return app._sequelize;
  };
};

function getSequelizeFromURL(url) {
  match = url.match(/([^:]+):\/\/([^:]*):([^@]*)@([^:]+):(\d+)\/(.+)/);

  if (!match) throw "Wrong DATABASE_URL format";

  var Sequelize = require('sequelize');

  new Sequelize(match[6], match[2], match[3], {
    dialect:  match[1],
    protocol: match[1],
    port:     match[5],
    host:     match[4],
    logging:  function(m) { console.log("[SQL]", m); }
  });
}
