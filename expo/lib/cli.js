var TasksDefault = module.exports = function(app, cli) {

  cli.go = function(argv) {
    // Shortcuts
    if (argv[2] === 'c') argv[2] = 'console';
    if (argv[2] === 's') argv[2] = 'server';

    if (argv.length === 2) {
      this.parse([argv[0], argv[1], '--help']);
    } else {
      this.parse(argv);
    }
  };

  cli
    .version(app.getPackageInfo().version);

  cli
    .command('server [port] [..]')
    .description('Starts the server')
    .action(function(port, flags) {
      require('../lib/runner')(app, port, flags);
    });

  cli
    .command('console')
    .description('Opens a console')
    .action(function() {
      global.app = app;
      app.load();
      require('repl').start({});
    });
};
