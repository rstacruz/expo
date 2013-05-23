var path = require('path');
var app = require('express')();
var extend = require('util')._extend;
var loadMixins = require('./lib/path_helpers').loadMixins;

extend(app, {
  // The root path.
  root: '',

  // Returns the commander command line parser.
  //
  //     app.cli()
  //     app.cli().parse(...)
  //
  cli: function() {
    if (!this._cli) {
      var cli = this._cli = require('commander');

      // Import default and custom tasks.
      require('./lib/tasks-default')(this, cli);
      loadMixins(this.path('tasks'), [this, cli]);
    }

    return this._cli;
  },

  // Gets a path relative to the root.
  //
  //     app.path('.')
  //     app.path('public')
  //
  path: function() {
    return path.resolve.apply(this, [this.root].concat([].slice.call(arguments)));
  },

  // Returns package.json information of the app.
  getPackageInfo: function() {
    return require(path.resolve(this.root, 'package.json'));
  },

  // Loads all files needed to run an Express server.
  //
  //     app.load(function(app) {
  //       app.listen(3000);
  //     });
  //
  load: function(callback) {
    this._loadPath('initializers');
    this._loadPath('models');
    this._loadPath('helpers');
    this._loadPath('routes');
    callback(this);
  },

  // Loads mixins in a given path.
  _loadPath: function(path) {
    loadMixins(this.path(path), [this]);
  }
});

module.exports = function(dir, callback) {
  app.root = dir;
  return app;
};
