
/**
 * Configuration loader.
 *
 *     var load = require('expo/conf');
 *
 *     load('file', [path1, path2]);
 */

module.exports = function(file, paths) {
  var path = require('path');

  var data = paths.reduce(function(last, filepath) {
    if (!last) last = load(path.join(filepath, file));
    return last;
  }, null);

  if (!data) throw [
    "Config file '"+file+"' not found.\n",
    "Searched in:\n  - " + paths.join("\n  - ")
  ].join("");

  return data;
};

function load(file) {
  require('js-yaml');
  try { require.resolve(file); } catch(e) { return; }
  return require(file);
}
