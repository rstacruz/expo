var express = require('express');

// Cookie store to enable `req.cookies` and `req.session`.
//
// * http://expressjs.com/api.html#cookieParser
// * http://expressjs.com/api.html#cookieSession
//
module.exports = function(app) {
  var secret = app.conf('secret');
  var token  = secret ? secret.token : '...';

  app.use(express.cookieParser(token));
  app.use(express.cookieSession({
    key: 'session',
    secret: token
  }));
};
