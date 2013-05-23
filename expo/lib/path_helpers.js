module.exports = {
  loadMixins: loadMixins
};

// Loads mixin modules in a path.
// Finds all module files in `filepath` and applies the arguments in `args`
// to each of those functions.
//
//     loadMixins('./models/', [app]);
//
function loadMixins(filepath, args) {
  var fs   = require('fs');
  var path = require('path');

  var self = this;

  var files = fs.readdirSync(filepath);
  files = files.sort();

  files.forEach(function(file) {
    // Igonre files without extensions.
    if (file.indexOf('.') === -1) return;

    var fn = path.resolve(filepath, file);

    // Ignore directories.
    if (isDirSync(fn)) return;

    require(fn).apply(self, args);
  });
}

function isDirSync(fn) {
  var stat = require('fs').statSync(fn);
  return stat.isDirectory();
}
