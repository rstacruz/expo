var nil = (function(){});

module.exports = function(env) {
  if (env !== 'production') {
    return {
      'log':   logger('   '),
      'error': logger(c(31, '!! ')),
      'warn':  logger(c(33, '>> ')),
      'info':  logger(c(36, '=> ')),
      'debug': logger(c(90, ' > '))
    };
  }
  else {
    return {
      'log':   logger(''),
      'error': logger('ERR:  '),
      'warn':  logger('WARN: '),
      'info':  logger('INFO: '),
      'debug': nil
    };
  }
};

/**
 * Logger factory
 */

function logger(prefix) {
  return function() {
    process.stdout.write(prefix);
    console.log.apply(this, arguments);
  };
}


function c(n, str) {
  return '\033['+n+'m'+str+'\033[0m';
}
