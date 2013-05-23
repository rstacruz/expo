module.exports = function(app) {
  app.on('load:after', function(app) {
    app.use(require('connect-assets')({
      src: app.path('assets'),
      buildDir: app.path('public')
    }));
  });
};
