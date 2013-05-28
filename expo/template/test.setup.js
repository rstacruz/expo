// Chai.js (http://chaijs.com/)
var chai = require('chai');
global.assert = chai.assert;
global.expect = chai.expect;
chai.should();

// Supertest (https://github.com/visionmedia/supertest)
global.request = require('supertest');

// Load the app
global.app = require('../app');
app.load('test');

exports.before = function(done) {
  // Insert any async-style code here to be done on each test.
  done();
};
