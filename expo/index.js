// Initialize app.
var app = require('express')();
require('./lib/app-ext')(app);

module.exports = function(dir, callback) {
  app.root = dir;
  return app;
};
