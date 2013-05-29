var express = require('express');

module.exports = function(app) {
  app.set('view engine', 'jade');

  app.configure('development', function() {
    app.use(express.favicon());
    app.use(express.logger('dev'));
  });

  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express['static'](app.path('public')));

  app.configure('development', function() {
    app.use(express.errorHandler());
  });

};
