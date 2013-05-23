// Initialize app.
var app = require('express')();
require('./lib/app')(app);

module.exports = function(dir, callback) {
  // process.chdir(dir);
  app.root = dir;
  return app;
};
