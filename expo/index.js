var path = require('path');
var app = require('express')();
var extend = require('util')._extend;

extend(app, {
  // The root path.
  root: '',

  // Command line parser.
  cli: null,

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

  // Runs the command line interface.
  go: function(argv) {
    if (argv.length === 2) {
      this.cli.parse([argv[0], argv[1], '--help']);
    } else {
      this.cli.parse(argv);
    }
  },

  _initializeCli: function(dir) {
    // Build the cli.
    this.cli = require('commander');
    require('./lib/tasks-default')(this, this.cli);
  },

  _initializeTasks: function() {
    var filepath = this.path('tasks');
    var loadMixins = require('./lib/path_helpers').loadMixins;
    loadMixins(filepath, [this, this.cli]);
  }
});

module.exports = function(dir, callback) {
  app.root = dir;
  app._initializeCli();
  app._initializeTasks();
  return app;
};
