var fs = require('fs');
var path = require('path');
var exists = fs.existsSync;

var Folder = module.exports = function(root) {
  this.root = root;
};

/**
 * Create a folder.
 *
 *     f.mkdir('app/initializers');
 */

Folder.prototype.mkdir = function (fpath) {
  fpath = path.join(this.root, fpath);

  if (exists(fpath)) {
    console.log(c(30, ' skip:  ' + fpath));
    return;
  }
  fs.mkdirSync(fpath, 0755);
  console.log(c(36, '       ') + fpath);
};

/**
 * Creates a folder and adds a gitkeep file.
 *
 *     f.gkeep('public');
 */

Folder.prototype.gkeep = function(fpath) {
  this.mkdir(fpath);
  this.write(fpath+'/.gitkeep', '');
};

/**
 * Writes a file.
 *
 *     f.write('app/initializers/app.js', '...');
 */

Folder.prototype.write = function(fpath, str, mode) {
  fpath = path.join(this.root, fpath);

  if (exists(fpath)) {
    console.log(c(30, ' skip: ' + fpath));
    return;
  }

  fs.writeFileSync(fpath, str);
  console.log('       ' + fpath);

  if (mode) fs.chmodSync(fpath, mode);
};

Folder.prototype.banner = function(header, msg) {
  msg = ' - ' + msg;
  console.log(c(30, '     ') + c(34, header) + c(30, msg));
};

function c(n, str) {
  return '\033['+n+'m'+str+'\033[0m';
}

function pad(n, char) {
  var str = '';
  for (var i=0; i<n; ++i) { str += char; }
  return str;
}
