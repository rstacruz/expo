var path = require('path');

var ExpoSequelize = module.exports = function(app) {
  app.on('cli', function(app, cli) {
    cli
      .command('db:create')
      .description("Creates databases")
      .action(function() {
        app.load();
        var db = app.conf('database');
        if (db.database) {
          app.sequelize()
            .query('CREATE DATABASE '+(db.database)+';')
            .success(function() {
              app.log.info("[db] Database %s created", db.database);
            })
            .error(function(err) {
              app.log.error("[db] Database %s failed to be created", db.database);
              app.log.error("[db] ", err);
              process.exit(1);
            });
        } else {
          app.log.info("[db] No database to create");
        }
      });

    cli
      .command('db:migrate')
      .description("Run database migrations")
      .action(function() {
        app.load();
        var options = { path: app.path('app/migrations') };
        var migrator = app.sequelize().getMigrator(options, true);
        migrator.migrate({ method: 'up' });
      });

    cli
      .command('gen:migration [name]')
      .description('Creates a migration file in migrations/')
      .action(function(name) {
        name = name || '';

        var bin = path.resolve(__dirname, 'node_modules', 'sequelize', 'bin', 'sequelize');
        var exec = require('child_process').exec;
        var cmd = bin + " --create-migration " + name;

        process.chdir(app.root);
        exec(cmd, function(cin, cout, cerr) {
          console.log(cout); console.warn(cerr);
        });

      });
  });

  // Loads sequelize.
  app.sequelize = function() {
    if (!app._sequelize) {
      var url = process.env.DATABASE_URL;

      if (url) {
        app.log.debug('[db] Loading sequelize via DATABASE_URL');
        app._sequelize = getSequelizeFromURL(url);
      } else {
        app.log.debug('[db] Loading sequelize');
        app._sequelize = getSequelizeFromConfig(app.conf('database'));
      }
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

function getSequelizeFromConfig(conf) {
  var Sequelize = require('sequelize');

  return new Sequelize(conf.database, conf.username, conf.password, conf);
}
