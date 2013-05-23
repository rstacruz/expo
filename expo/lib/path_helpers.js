var PathHelpers = module.exports = {
  loadMixins: loadMixins,
  isDirSync: isDirSync
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

  if (!isDirSync(filepath)) return;

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

// Checks if a given path is a directory.
function isDirSync(fn) {
  var fs = require('fs');

  if (!fs.existsSync(fn)) return false;

  var stat = fs.statSync(fn);
  return stat.isDirectory();
}
