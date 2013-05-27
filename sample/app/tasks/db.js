module.exports = function(app, cli) {
  cli
  .command('db:seed')
  .description('seeds')
  .action(function() {
    console.log(":)");
  });
};
