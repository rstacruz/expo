// Runner
// ------
//
// Runs the Express app. Wraps it in supervisor if need be.
//
var Runner = module.exports = function(app, port, flags) {
  var time = { start: +new Date() };

  port = port || 4567;

  // Quick start mode
  if (flags === 'Q') {
    app.load();
    start();
  }

  // Supervisor mode
  else if (app.get('env') === 'development') {
    app.log.info('Auto-restarting on changes');
    printHeader();
    runSupervisor();
  } 

  else {
    app.on('load:before', function() { printHeader(); });
    app.load();
    start();
  }

  // Helpers
  // -------

  function printHeader() {
    app.log.info("Running %s mode at http://0.0.0.0:"+port, app.get('env'));
  }

  // Invokes supervisor to load the runner bin of the application.
  function runSupervisor() {
    var supervisor = require('supervisor');
    supervisor.run(['-n', 'error', '-q', '-e', 'node|js|coffee', '--', process.argv[1], 'server', port, 'Q']);
  }

  function start() {
    var elapsed = +new Date() - time.start;
    app.log.info('Ready [' + elapsed + 'ms]');
    catchExceptions();
    app.listen(port);
  }

  /**
   * Print unhandled exceptions and terminate
   */

  function catchExceptions() {
    if (app.get('env') === 'development') {
      process.on('exit', function() {
        app.log.debug('Restarting...');
      });
    }

    process.on('uncaughtException', function(err) {
      app.log.error(err.stack);

      if (Object.keys(err).length > 0)
        app.log.error("Error data:", JSON.stringify(err, null, 2));

      // Let supervisor handle the restart
      if (app.get('env') === 'development') process.exit(0);
      process.exit(128);
    });
  }

  function timestamp() {
    return (new Date()).toString().split(' ')[4];
  }
};
