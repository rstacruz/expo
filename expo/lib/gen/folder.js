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
    console.log('  \033[30m skip: ' + fpath + '/\033[0m');
    return;
  }
  fs.mkdirSync(fpath, 0755);
  console.log('  \033[36mmkdir: \033[36m' + fpath + '/\033[0m');
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
    console.log('  \033[30m skip: ' + fpath + '\033[0m');
    return;
  }

  fs.writeFileSync(fpath, str);
  console.log('  \033[36m      \033[0m ' + fpath);

  if (mode) fs.chmodSync(fpath, mode);
};
