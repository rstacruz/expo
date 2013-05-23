var TasksDefault = module.exports = function(app, cli) {
  cli
    .version(app.getPackageInfo().version);

  cli
    .command('server')
    .description('Starts the server')
    .action(function() {
      var port = 4567;
      console.log("=> Listening at", port);
      app.listen(port);
    });

  cli
    .command('console')
    .description('Opens a console')
    .action(function() {
      global.app = app;
      require('repl').start({});
    });
};
