// Sample model.
// See: http://sequelizejs.com/documentation

var app = require('../..');
var Sq = require('sequelize');

module.exports = app.sequelize().define('Sample', {
  title: Sq.STRING,
  description: Sq.TEXT
}, {
});
