// Initialize app.
var app = require('express')();
require('./lib/app-ext')(app);

module.exports = function(dir, callback) {
  process.chdir(dir);
  app.root = dir;
  return app;
};
