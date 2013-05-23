module.exports = function(app) {
  app.on('cli', function(app, cli) {
    cli
      .command('test')
      .description('Invoke tests')
      .action(function() {
      });
  });
};
        
