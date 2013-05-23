var express = require('express');

module.exports = function(app) {
  app.set('view engine', 'jade');
  app.set('views', app.path('views'));

  app.use(express['static'](app.path('public')));
  app.use(express.favicon());
  app.use(express.methodOverride());
  app.use(express.bodyParser());

  app.use(express.cookieParser('secret-here'));
  app.use(express.cookieSession({
    key: 'connect_session'
  }));

  app.configure('development', function() {
    app.use(express.logger('dev'));
    app.use(express.errorHandler());
  });
};
