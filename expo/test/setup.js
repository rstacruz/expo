// Test libs
global.chai = require('chai');
global.assert = chai.assert;
global.request = require('supertest');

// Config
chai.should();

// App
global.expo = require('..');

// Helpers
global.fixturePath = function(name) {
  var path = require('path');
  return path.resolve(__dirname, 'fixtures', name);
};

global.loadFixtureApp = function(fixture) {
  delete process.env.NODE_ENV;
  var app = require('express')();
  app = expo(app, fixturePath(fixture));
  return app;
};

global.path = require('path');
