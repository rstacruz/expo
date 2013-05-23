var express = require('express');

module.exports = function(app) {
  app.configure('development', function() {
  });

  app.configure(function() {
    // Views
    app.set('view engine', 'jade');
    app.set('views', app.path('views'));

    // Public folder
    app.use(express['static'](app.path('public')));

    app.use(express.favicon());
    if (app.get('env') === 'development') app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
  });

  app.configure('development', function() {
    app.use(express.errorHandler());
  });
};
