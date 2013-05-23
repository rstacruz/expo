var path = require('path');
var loadMixins = require('./path_helpers').loadMixins;
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

  // Loads all files needed to run an Express server.
  //
  //     app.load(function(app) {
  //       app.listen(3000);
  //     });
  //
  // Also emits the following events in this sequence:
  //
  //  * load:before
  //  * initializers:before, initializers:after
  //  * models:before, models:after
  //  * helpers:before, helpers:after
  //  * routes:before, routes:after
  //  * load:after
  //
  app.load = function(callback) {
    this.emit('load:before');

    loadPath('initializers');
    loadPath('models');
    loadPath('helpers');
    loadPath('routes');

    this.emit('load:after');
    callback(this);
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
      require('./tasks-default')(this, cli);

      // Extension tasks;
      this.events.emit('cli', this, cli);

      // Application tasks.
      loadMixins(this.path('tasks'), [this, cli]);
    }

    return this._cli;
  };

  // Logger
  // ------

  // Simple logging facility.
  app.log = function(type, msg) {
    console.log('=>', '['+type+']', msg);
  };

  // Events
  // ------

  // Event emitter.
  app.events = new EventEmitter();

  // Emits an event.
  app.emit = function(eventName) {
    return this.events.emit(eventName, this);
  };

  // Listens to a given event.
  app.on = function(eventName, listener) {
    this.events.on(eventName, listener);
    return this;
  };

  // Config
  // ------

  
  app._configData = {};

  // Loads configuration from a file.
  app.configFile = function(file) {
    if (!app._configData[file])  {
      var fname = app.path('config', file+'.json');
      var data = require(fname);
      app._configData[file] = data[app.get('env')];
    }

    return app._configData[file];
  };

  // Private helpers
  // ---------------

  // Loads mixins in a given path.
  function loadPath(path) {
    app.emit(path+':before');
    loadMixins(app.path(path), [app]);
    app.emit(path+':after');
  }
};

