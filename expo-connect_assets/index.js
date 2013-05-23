var extend = require('util')._extend;

module.exports = function(app) {
  app.on('load:after', function(app) {
    var options = {
      src: app.path('assets'),
      buildDir: app.path('public')
    };

    // Get config from app.get.
    if (typeof app.get('assets') === 'object') {
      extend(options, app.get('assets'));
    }

    app.use(require('connect-assets')(options));
  });

  app.on('cli', function(app, cli) {
    cli
      .command('assets:precompile')
      .description('Precompiles asset files')
      .action(function() {
        console.log('..');
      });
  });
};
