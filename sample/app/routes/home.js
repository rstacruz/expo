module.exports = function(app) {
  app.get('/', function(req, res) {
    res.render('index', {});
  });

  app.get('/n', function(req, res) {
    var Note = require('../../lib/note');
    res.send('hi');
  });
};
