var Runner = module.exports = function(app, port, flags) {
  port = port || 4567;

  app.load(function(app) {
    if (flags === 'Q') {
      console.log('=> Reloaded');
      start();
      return;
    }

    printHeader();

    if (app.get('env') === 'development') {
      console.log('=> Auto-restarting on changes');
      runSupervisor();
      return;
    }

    start();
  });

  function printHeader() {
    console.log("=> Environment:", app.get('env'));
    console.log("=> Listening at http://0.0.0.0:"+port);
  }

  function runSupervisor() {
    var supervisor = require('supervisor');
    supervisor.run(['-n', 'exit', '-q', '--', process.argv[1], 'server', port, 'Q']);
  }

  function start() {
    app.listen(port);
  }
};
