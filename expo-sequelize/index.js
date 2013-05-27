var path = require('path');

var ExpoSequelize = module.exports = function(app) {
  app.on('cli', function(app, cli) {
    cli
      .command('db:create')
      .description("Creates the environment's database")
      .action(function() {
        app.load();
        databaseSetup(app, function(dbname) {
          app.sequelize()
            .query('CREATE DATABASE ' + dbname + ';')
            .success(function() {
              app.log.info("[db] Database '%s' created", dbname);
            })
            .error(function(err) {
              app.log.error("[db] Database '%s' failed to be created", dbname);
              app.log.error("[db] => %s", err.message);
              process.exit(1);
            });
        });
      });

    cli
      .command('db:drop')
      .description("Drops the environment's database")
      .action(function() {
        app.load();
        databaseSetup(app, function(dbname) {
          app.sequelize()
            .query('DROP DATABASE ' + dbname + ';')
            .success(function() {
              app.log.info("[db] Database '%s' dropped", dbname);
            })
            .error(function(err) {
              app.log.error("[db] Database '%s' failed to be dropped", dbname);
              app.log.error("[db] => %s", err.message);
              process.exit(1);
            });
        });
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

        process.chdir(app.path('app'));
        exec(cmd, function(cin, cout, cerr) {
          console.log(cout); console.warn(cerr);
        });

      });
  });

  /**
   * Loads sequelize.
   */

  app.sequelize = function() {
    if (!app._sequelize) {
      var url = process.env.DATABASE_URL;
      var conf;

      if (url) {
        conf = parseURL(url);
        app.log.debug('[db] Loading sequelize via DATABASE_URL');
      } else {
        conf = app.conf('database');
        app.log.debug('[db] Loading sequelize');
      }
      app._sequelize = getSequelizeFromConfig(conf);
    }

    return app._sequelize;
  };
};

/**
 * Returns a `Sequelize` instance from a given URL.
 */

function parseURL(url) {
  var match = url.match(/([^:]+):\/\/([^:]*):([^@]*)@([^:]+):(\d+)\/(.+)/);
  if (!match) throw "Wrong DATABASE_URL format";

  return {
    dialect:  match[1],
    username: match[2],
    password: match[3],
    host:     match[4],
    port:     match[5],
    database: match[6]
  };
}

/**
 * Returns a `Sequelize` instance from a given configuration hash.
 */

function getSequelizeFromConfig(conf) {
  var Sequelize = require('sequelize');
  return new Sequelize(conf.database, conf.username, conf.password, conf);
}

/**
 * Loads the app environment with no specific database.
 * Used to create and drop databases.
 */

function databaseSetup(app, callback) {
  var db = app.conf('database');

  var dbname = db.database;
  db.database = undefined;

  if (!dbname) {
    app.log.warn("[db] No database to work on");
    process.exit(0);
  }

  callback(dbname);
}

