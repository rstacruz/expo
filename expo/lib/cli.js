/**
 * @group Command line
 * The command line interface
 */

module.exports = function(app, cli) {

  cli.go = function(argv) {
    // Shortcuts
    if (argv[2] === 'c') argv[2] = 'console';
    if (argv[2] === 's') argv[2] = 'server';
    if (argv[2] === 'r') argv[2] = 'runner';

    this.parse(argv);
    if (argv.length === 2) this.help();
  };

  cli
    .version(require(app.path('package')).version)
    .option('-e, --env [env]', 'Environment to start in [develompent]');

  cli
    .on('env', function(env) {
      app.set('env', env);
    });

  /**
   * Starts a server.
   */

  cli
    .command('server [port] [..]')
    .description('Starts the server (alias: "s")')
    .action(function(port, flags) {
      require('../lib/runner')(app, port, flags);
    });

  cli
    .command('console')
    .description('Opens a console (alias: "c")')
    .action(function() {
      global.app = app.load();
      require('repl').start({});
    });

  cli
    .command('runner [cmd]')
    .description('Runs a command (alias: "r")')
    .action(function(command) {
      console.log('run');
      global.app = app.load();
      eval(command);
    });
};
