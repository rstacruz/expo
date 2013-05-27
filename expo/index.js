module.exports = function(app, dir) {
  require('./lib/app')(app);
  app.root = dir;
  return app;
};
