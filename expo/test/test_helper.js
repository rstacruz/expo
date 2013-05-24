global.chai = require('chai');
chai.should();
global.assert = chai.assert;

global.request = require('supertest');

global.expo = require('..');

global.fixturePath = function(name) {
  var path = require('path');
  return path.resolve(__dirname, 'fixtures', name);
}
