var app = module.exports = require('express')();
require('expo')(app, __dirname);
require('expo-sequelize')(app);
require('expo-connect_assets')(app);
