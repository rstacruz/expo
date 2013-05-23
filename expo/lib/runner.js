// Runner
// ------
//
// Runs the Express app. Wraps it in supervisor if need be.
//
var Runner = module.exports = function(app, port, flags) {
  port = port || 4567;

  app.load(function(app) {
    if (flags === 'Q') {
      app.log('runner', 'Application loaded at ' + timestamp());
      start();
      return;
    }

    printHeader();

    if (app.get('env') === 'development') {
      app.log('runner', 'Auto-restarting on changes');
      runSupervisor();
      return;
    }

    start();
  });

  function printHeader() {
    app.log('runner', "Environment: " + app.get('env'));
    app.log('runner', "Listening at http://0.0.0.0:"+port);
  }

  // Invokes supervisor to load the runner bin of the application.
  function runSupervisor() {
    var supervisor = require('supervisor');
    supervisor.run(['-n', 'exit', '-q', '-e', 'node|js|coffee', '--', process.argv[1], 'server', port, 'Q']);
  }

  function start() {
    app.listen(port);
  }
  function timestamp() {
    return (new Date()).toString().split(' ')[4];
  }
};
