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
      if (env) app.set('env', env);

      // Hooks: do pre-load hooks that extensions may listen for.
      events.emit('load:before', app);
      if (env === 'test') events.emit('load:test:before', app);

      // Load initializers of the application.
      loadPath('app/initializers', function(mixin) { mixin(app); });

      // Ensure this is the last middleware in the stack.
      app.use(app.router);

      // Apply the helpers using `.local()` to make them available to all views.
      loadPath('app/helpers', function(helpers) { app.locals(helpers); });

      // Load routes of the application.
      loadPath('app/routes', function(mixin) { mixin(app); });

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
      loadModules(app.path('app/tasks'), function(mixin) { mixin(app, command); });
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

  app.log = require('clog');

  // Events
  // ------

  /**
   * Listens to a given event.
   *
   *     app.on('load:before', function() { ... })
   *
   * This emits events during the load process, allowing extensions to hook
   * onto certain parts of the load process.
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
   * Loads configuration from a file.
   *
   *     // Reads `config/secret_token.js`
   *     app.conf('secret_token');
   */

  app.conf = function(file) {
    if (!(file in configData)) {
      var data;
      try {
        data = require(app.path('config', file));
        data = data[app.get('env')];
      } catch (e) {
        data = undefined;
      }
      configData[file] = data;
    }

    return configData[file];
  };

  // Private helpers
  // ---------------

  /**
   * Loads mixins in a given path.
   * @api private
   */

  function loadPath(path, callback) {
    events.emit(path+':before', app);
    loadModules(app.path(path), callback);
    events.emit(path+':after', app);
  }
};
