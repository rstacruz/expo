var TasksDefault = module.exports = function(app, cli) {
  cli
    .version(app.getPackageInfo().version);

  cli
    .command('server')
    .description('Starts the server')
    .action(function() {
      app.load(function(app) {
        var port = 4567;
        console.log("=> Environment:", app.get('env'));
        console.log("=> Listening at http://0.0.0.0:"+port);
        app.listen(port);
      });
    });

  cli
    .command('console')
    .description('Opens a console')
    .action(function() {
      global.app = app;
      require('repl').start({});
    });
};
