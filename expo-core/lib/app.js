var path = require('path');
var loadModules = require('./path_helpers').loadModules;
var EventEmitter = require('events').EventEmitter;

// Application extensions mixin.
// Extends an Express app with more functions.
//
var AppExt = module.exports = function(app) {
  // The root path. To be overriden later.
  app.root = '';

  // Gets a path relative to the root.
  //
  //     app.path('.')
  //     app.path('public')
  //
  app.path = function() {
    return path.resolve.apply(this, [this.root].concat([].slice.call(arguments)));
  };

  // Returns package.json information of the app.
  app.getPackageInfo = function() {
    return require(path.resolve(this.root, 'package.json'));
  };

  var loaded = false;

  // Loads all files needed to run an Express server.
  //
  //     app.load();
  //     app.listen(3000);
  //
  // Also emits the following events in this sequence:
  //
  //  * load:before
  //  * initializers:before, initializers:after
  //  * helpers:before, helpers:after
  //  * routes:before, routes:after
  //  * load:after
  //
  app.load = function(env) {
    if (!loaded) {
      console.time('x');
      process.chdir(app.root);

      // Set environment if asked (usually test).
      if (env) app.set('env', env);

      // Hooks: do pre-load hooks that extensions may listen for.
      this.events.emit('load:before', app);
      if (env === 'test') this.events.emit('load:test:before', app);

      // Load initializers of the application.
      loadPath('initializers', function(mixin) { mixin(app); });

      // Ensure this is the last middleware in the stack.
      app.use(app.router);

      // Apply the helpers using `.local()` to make them available to all views.
      loadPath('helpers', function(helpers) { app.locals(helpers); });

      // Load routes of the application.
      loadPath('routes', function(mixin) { mixin(app); });

      // After hooks
      if (env === 'test') this.events.emit('load:test:after', app);
      this.events.emit('load:after', app);

      if (env === 'test') app.log.debug('App loaded for test environment');
      console.timeEnd('x');

      loaded = true;
    }

    return this;
  };

  // Returns the commander command line parser.
  //
  //     app.cli()
  //     app.cli().parse(...)
  //
  app.cli = function() {
    if (!this._cli) {
      var cli = this._cli = require('commander');

      // Import default tasks;
      require('./cli')(app, cli);

      // Extension tasks;
      app.events.emit('cli', app, cli);

      // Application tasks.
      loadModules(app.path('tasks'), function(mixin) { mixin(app, cli); });
    }

    return this._cli;
  };

  // Logger
  // ------

  // Simple logging facility.
  app.log = require('clog');

  // Events
  // ------

  // Event emitter.
  app.events = new EventEmitter();

  // Listens to a given event.
  app.on = function(eventName, listener) {
    this.events.on(eventName, listener);
    return this;
  };

  // Config
  // ------
  
  app._configData = {};

  // Loads configuration from a file.
  app.conf = function(file) {
    if (!app._configData[file])  {
      var fname =
        getFile(app.path('config', file+'.js')) ||
        getFile(app.path('config', file+'.coffee'));

      var data = require(fname);
      app._configData[file] = data[app.get('env')];
    }

    return app._configData[file];
  };

  // Private helpers
  // ---------------

  function getFile(fname) {
    var fs = require('fs');
    if (fs.existsSync(fname)) return fname;
  }

  // Loads mixins in a given path.
  function loadPath(path, callback) {
    app.events.emit(path+':before', app);
    loadModules(app.path(path), callback);
    app.events.emit(path+':after', app);
  }
};

