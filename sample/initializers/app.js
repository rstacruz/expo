var express = require('express');

module.exports = function(app) {
  app.set('view engine', 'jade');
  app.set('views', app.path('views'));

  app.use(express['static'](app.path('public')));
  app.use(express.methodOverride());
  app.use(express.bodyParser());

  app.configure('development', function() {
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.errorHandler());
  });
};
