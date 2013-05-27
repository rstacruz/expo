module.exports = function(app) {
  app.configure(function() {
    // List of assets to be precompiled when running `./run assets:precompile`.
    app.set('assets precompiled', {
      js: ['application'],
      css: ['application']
    });
  });
};
