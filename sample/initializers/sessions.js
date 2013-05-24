var express = require('express');

// Cookie store to enable `req.cookies` and `req.session`.
//
// * http://www.senchalabs.org/connect/cookieParser.html
// * http://www.senchalabs.org/connect/session.html
//
module.exports = function(app) {
  var secret = app.conf('secret');
  var token  = secret ? secret.token : '...';

  app.use(express.cookieParser(token));
  app.use(express.session({
    key: 'session',
    secret: token
  }));
};
