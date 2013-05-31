var app = require('../..');

app.get('/', function(req, res) {
  res.render('index');
});
