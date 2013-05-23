var app = require('../app');
var Sq = require('sequelize');

var Note = module.exports = app.sequelize().define('Note', {
  title: Sq.TEXT
}, {
  instanceMethods: {
  }
});
