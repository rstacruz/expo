module.exports = function(app) {
  app.on('load:after', function() {
    console.log('.');
    app.use(require('connect-assets')());
  });
};
