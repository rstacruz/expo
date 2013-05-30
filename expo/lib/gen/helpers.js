
/**
 * Executes a given shell command.
 */

exports.exec = function(cmd, callback) {
  var spawn = require('child_process').spawn;
  var proc = spawn('sh', ['-c', cmd].concat(cmd), { stdio: 'inherit', customFds: [0, 1, 2] });
  proc.on('exit', function(code){
    if (code > 0) return callback(code);
    return callback();
  });
}

