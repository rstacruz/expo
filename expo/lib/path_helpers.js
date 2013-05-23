module.exports = {
  loadMixins: function(filepath, args) {
    var fs   = require('fs');
    var path = require('path');

    var self = this;

    var files = fs.readdirSync(filepath);
    files.forEach(function(file) {
      console.log('=>', file);
      var fn = path.resolve(filepath, file);
      require(fn).apply(self, args);
    });
  }
};
