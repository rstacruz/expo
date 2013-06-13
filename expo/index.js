var expo = module.exports = function(app, dir) {
  require('./lib/app')(app);
  app.root = dir;
  return app;
};

/**
 * Middleware proxy to express.errorHandler, but let 404 errors through.
 *
 *     app.use(app.errorHandler(express.errorHandler));
 */

expo.errorHandler = function(handler) {
  return function(err, req, res, next) {
    if (err === 404) return next(404);
    handler.apply(this, arguments);
  };
};

