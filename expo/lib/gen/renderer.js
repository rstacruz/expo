var fs = require('fs');
var path = require('path');

var Renderer = module.exports = function(options) {
  return {
    text: function(fpath) {
      return readTemplate(fpath);
    },

    js: function(fpath) {
      return readTemplate(fpath);
    },

    readme: function(fpath) {
      return this.text(fpath)
        .replace(/PROJECT/g, options.project);
    },

    jade: function(fpath) {
      var str = this.text(fpath);
      if (!options.assets)
        str = str.replace(/\n.*( js| css).*\n/g, '\n');
      return str;
    },

    // Initializer
    appjs: function(fpath) {
      var str = this.text(fpath);
      if (!option.session)
        str = str.replace(/^.*token.*\n/mg, '\n');
      return str;
    },

    secret: function() {
      var crypto = require('crypto');
      var string = crypto.randomBytes(128).toString('base64');
      return 'production: "'+string+'"\n';
    },

    appjs: function(fpath) {
      var str = this.js(fpath);
      if (!options.db)
        str = str.replace(/^.*'expo-sequelize'.*\n/mg, '\n');
      if (!options.assets)
        str = str.replace(/^.*'expo-connect_assets'.*\n/mg, '\n');
      return str;
    },

    'package': function(fpath) {
      var str = this.readme(fpath);
      if (!options.db)
        str = str.replace(/^.*"(expo-sequelize|pg|mysql|sqlite3|sequelize)".*\n/mg, '\n');
      if (!options.assets)
        str = str.replace(/^.*"(expo-connect_assets|stylus|nib|connect-assets)".*\n/mg, '\n');
      if (!options.tests)
        str = str.replace(/^.*"(test|mocha|chai|supertest)".*\n/mg, '\n');
      str = JSON.stringify(JSON.parse(str), null, 2);
      return str;
    }
  };
};

function readTemplate(fpath) {
  var fullpath = path.resolve(__dirname, '../../template', fpath);
  return fs.readFileSync(fullpath).toString();
}
