var PathHelpers = module.exports = {
  loadModules: loadModules,
  isDirSync: isDirSync
};

// Loads mixin modules in a path.
// Finds all module files in `filepath` and gives them to `callback`.
// to each of those functions.
//
//     loadModules('./models/', function(m) { ... });
//
function loadModules(filepath, callback) {
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

    callback(require(fn));
  });
}

// Checks if a given path is a directory.
function isDirSync(fn) {
  var fs = require('fs');

  if (!fs.existsSync(fn)) return false;

  var stat = fs.statSync(fn);
  return stat.isDirectory();
}
