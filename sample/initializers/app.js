var express = require('express');

module.exports = function(app) {
  app.configure(function() {
    app.set('view engine', 'jade');
    app.set('views', app.path('views'));
    app.use(express['static'](app.path('public')));
    app.use(express.favicon());
    app.use(express.bodyParser());
    app.use(express.methodOverride());
  });

  app.configure('development', function() {
    app.use(express.logger('dev'));
    app.use(express.errorHandler());
  });

  app.configure(function() {
    app.use(app.router);
  });
};
