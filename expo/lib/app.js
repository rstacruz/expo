var path = require('path');
var loadModules = require('./path_helpers').loadModules;
var EventEmitter = require('events').EventEmitter;

/**
 * Application extensions mixin.
 * Extends an Express app with more functions.
 */

var app = module.exports = function(app) {

  /**
   * Event emitter. Used by `emit()` and such.
   * @api private
   */

  var events = new EventEmitter();

  /**
   * The root path. To be overriden later.
   */

  app.root = '';

  /**
   * Gets a path relative to the root.
   *
   *     app.path('public')
   *     app.path('app/migrations')
   */

  app.path = function() {
    return path.resolve.apply(this, [this.root].concat([].slice.call(arguments)));
  };

  var loaded = false;

  /**
   * Loads all files needed to run an Express server.
   *
   *     app.load();
   *     app.listen(3000);
   *
   * Also emits the following events in this sequence:
   *
   *  - load:before
   *  - initializers:before, initializers:after
   *  - helpers:before, helpers:after
   *  - routes:before, routes:after
   *  - load:after
   */

  app.load = function(env) {
    if (!loaded) {
      process.chdir(app.root);

      // Set environment if asked (usually test).
      if (env) {
        process.env.NODE_ENV = env;
        app.set('env', env);
      }

      env = app.get('env');
      if (env !== 'development') app.log = require('./logger')(env);

      // Hooks: do pre-load hooks that extensions may listen for.
      events.emit('load:before', app);
      if (env === 'test') events.emit('load:test:before', app);

      // Load initializers of the application.
      loadAppPath('initializers', 'function', function(mixin) { mixin(app); });

      // Middleware for 'file not found' and 'server error' -- must always be
      // the last
      app.use(notFound);
      app.use(serverError);

      // Apply the helpers using `.local()` to make them available to all views.
      loadAppPath('helpers', 'object', function(helpers) { app.locals(helpers); });

      // Load routes of the application.
      loadAppPath('routes', 'function', function(mixin) { mixin(app); });

      // After hooks
      if (env === 'test') events.emit('load:test:after', app);
      events.emit('load:after', app);

      if (env === 'test') app.log.debug('App loaded for test environment');

      loaded = true;
    }

    return this;
  };

  var command;

  /**
   * Returns the commander command line parser.
   *
   *      app.cli()
   *      app.cli().parse(...)
   */

  app.cli = function() {
    if (!command) {
      command = require('commander');

      // Import [1] default tasks, [2] extensions tasks, [3] app tasks.
      require('./cli')(app, command);
      events.emit('cli', app, command);
      loadModules(app.path('app/tasks'), 'function', function(mixin) { mixin(app, command); });
    }

    return command;
  };

  // Logger
  // ------

  /**
   * Simple logging facility.
   *
   *     app.log.debug('Loading models');
   *     app.log.info('Loading models');
   */

  app.log = require('./logger')(process.env.NODE_ENV || 'development');

  // Events
  // ------

  /**
   * The events.
   * You may emit events here.
   */

  app.events = events;

  /**
   * Listens to a given event.
   *
   *     app.on('load:before', function() { ... })
   *
   * This emits events during the load process, allowing extensions to hook
   * onto certain parts of the load process.
   *
   * This is just shorthand for `app.events.on(x, ...)`.
   *
   * See `app.load()` for a catalog of events that it emits.
   */

  app.on = function(eventName, listener) {
    events.on(eventName, listener);
    return this;
  };

  // Config
  // ------
  
  var configData = {};

  /**
   * Loads configuration from a file. Yaml, JSON and JS are supported.
   *
   *     // Reads `config/secret_token.yml`
   *     // (or .json, or .js, or .coffee)
   *     app.conf('secret_token');
   */

  app.conf = function(file) {
    if (!(file in configData)) {
      var env = app.get('env');
      var load = require('./conf');

      var data = load(file, [
        app.path('config'),
        path.join(process.cwd(), 'config')
      ]);

      configData[file] = (env in data ? data[env] : data['default']);
    }

    return configData[file];
  };

  // Defaults
  // --------

  /**
   * Set some defaults
   */

  app.set('views', app.path('app/views'));


  // Private helpers
  // ---------------

  /**
   * Loads mixins in a given path.
   * @api private
   */

  function loadAppPath(path, type, callback) {
    events.emit(path+':before', app);
    loadModules(app.path('app', path), type, callback);
    events.emit(path+':after', app);
  }

  function notFound(req, res, next) {
    res.render('errors/404', { status: 404, url: req.url });
  }

  function serverError(err, req, res, next) {
    if (err === 404)
      return notFound(req, res, next);

    res.render('errors/500', { status: 500, error: err });
  }
};
