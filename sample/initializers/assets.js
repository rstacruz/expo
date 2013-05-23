module.exports = function(app) {
  app.configure(function() {
    app.set('assets precompiled', {
      js: ['application'],
      css: ['application']
    });
  });
};
