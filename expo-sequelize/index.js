var fs = require('fs');
var path = require('path');
var extend = require('util')._extend;

var ExpoSequelize = module.exports = function(app) {
  app.on('cli', function(app, cli) {
    cli
      .command('db-create')
      .description("Creates the environment's database")
      .action(function() {
        app.load();
        databaseSetup(app, function(dbname, dialect) {
          app.sequelize()
            .query('CREATE DATABASE ' + quotify(dbname, dialect) + ';')
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
      .command('db-drop')
      .description("Drops the environment's database")
      .action(function() {
        app.load();
        databaseSetup(app, function(dbname, dialect) {
          app.sequelize()
            .query('DROP DATABASE ' + quotify(dbname, dialect) + ';')
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
      .command('db-migrate')
      .description("Run database migrations")
      .action(function() {
        app.load();
        var options = { path: app.path('app/migrations') };
        var migrator = app.sequelize().getMigrator(options, true);
        migrator.migrate({ method: 'up' });
      });

    cli
      .command('db-sync [force]')
      .description("Performs Sequelize syncing")
      .action(function(force) {
        var isForce = (force === 'force');

        app.load();
        loadModels(app);

        app.log.log("");
        app.log.info(isForce ? "Force-syncing..." : "Syncing...");
        app.sequelize().sync({force: isForce})
        .then(function() {
          app.log.info("Success");
        }, function(e) {
          app.log.error("failed");
          app.log.error(e);
          process.exit(1);
        });
      });

    cli
      .command('gen-migration [name]')
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
      } else {
        conf = app.conf('database');
      }

      app.events.emit('sequelize:before', app);
      app._sequelize = getSequelizeFromConfig(app, conf);
      app.events.emit('sequelize:after', app, app._sequelize);
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

function getSequelizeFromConfig(app, conf) {
  var options = extend({}, conf);

  var isDev = (app.get('env') === 'development');
  extend(options, {
    logging: isDev ? (function(m) { app.log.debug("[sql] %s", m); }) : (function(){})
  });

  var Sequelize = require('sequelize');
  return new Sequelize(conf.database, conf.username, conf.password, options);
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

  var dialect = db.dialect;
  callback(dbname, dialect);
}

function quotify(str, dialect) {
  if (dialect === 'mysql') return "`"+str+"`";
  return str;
}

function loadModels(app) {
  app.log.info('Loading models:');

  var mpath = app.path('lib/models');
  var files = fs.readdirSync(mpath);
  files.forEach(function(file) {
    app.log.log('    %s', file);
    require(path.join(mpath, file));
  });
}
