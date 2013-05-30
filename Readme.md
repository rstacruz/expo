Expo
====

Expo is a meta-framework for rapid [Node.js] web development. It provides you 
will the sensible defaults you need to build the backend of a modern web 
application.

``` cmd
# Install it via:
$ npm install -g expo
$ expo --help
```

 * __Routing__
   * Routing API *-- via [Express]*
   * Middleware support *-- via [connect]*
   * Sessions, helpers, cookies
 * __Assets__
   * Asset pipeline *-- via [connect-assets]*
   * Concatenation, compression, cache-busting
   * Support for CoffeeScript, Less, Stylus
 * __Database__
   * Database ORM *-- via [Sequelize]*
   * Database migrations
 * __Testing__
   * Tests *-- via [Mocha]*
   * Assertions *-- via [Chai]*
   * Integration tests *-- via [superagent]*
 * __Utilities__
   * Command-line tasks *-- via [commander.js]*
   * Auto-restarting on changes *-- via [supervisor]*
   * Logging
   * Config file loading

[![Status](https://travis-ci.org/rstacruz/expo.png?branch=master)](https://travis-ci.org/rstacruz/expo)

## Your first app

Expo lets you start up sites very fast.
Create a project using the `expo` command. Here we'll use `--bare`, which
generates the bare minimum:

```
$ expo --bare hello

        hello/  your project
                Readme.md
                run
                app.js
                .gitignore
                package.json

 initializers/  code that initializes the app environment
                app/initializers/app.js

       routes/  auto-loaded files that create URL routes
                app/routes/home.js

        views/  template files
                app/views/index.jade
                app/views/layout.jade

  install dependencies:
    $ cd hello
    $ npm install && npm shrinkwrap

  run the app:
    $ ./run server

  more info:
    $ ./run --help
```

[Read about creating projects >]( guide.html#expo-executable )

## Full setup

...But this isn't always that useful, since you probably will need assets,
databases, sessions, tests, helpers and other doodads. Use `expo` without 
switches to generate the default layout:

```
$ expo hello

        hello/  your project
                Readme.md
                run
                app.js
                .gitignore
                package.json

       assets/  where your images, CSS and JS files live
                app/assets/css/application.styl
                app/assets/js/application.js
                app/assets/img/.gitkeep

 initializers/  code that initializes the app environment
                app/initializers/app.js
                app/initializers/assets.js
                app/initializers/sessions.js

      helpers/  functions available in your views
                app/helpers/app_helper.js

       routes/  auto-loaded files that create URL routes
                app/routes/home.js

        tasks/  command line tasks
                app/tasks/db.js

        views/  template files
                app/views/index.jade
                app/views/layout.jade

       config/  yaml config files
                config/database.yml.example
                config/secret_token.yml

           db/  development sqlite database
                db/.gitkeep

         lib/   models and code
                lib/.gitkeep

       public/  normal files go here
                public/robots.txt

         test/  tests, specs
                test/setup.js
                test/app_test.js

  install dependencies:
    $ cd aoeu
    $ npm install && npm shrinkwrap
```

[Read about creating projects >]( guide.html#expo-executable )

## Command line runner

Expo projects come with a runner that gives you access to default tasks.
Simply invoke ./run in a project.

```
$ cd myproject
$ ./run --help

  Usage: run [options] [command]

  Commands:

    server [port] [..]     Starts the server (alias: "s")
    console                Opens a console (alias: "c")
    runner [cmd]           Runs a command (alias: "r")
    db-create              Creates the environment's database
    db-drop                Drops the environment's database
    db-migrate             Run database migrations
    gen-migration [name]   Creates a migration file in migrations/
    assets-precompile      Precompiles asset files

  Options:

    -h, --help       output usage information
    -V, --version    output the version number
    -e, --env [env]  Environment to start in [develompent]
```

[Read about the runner >]( guide.html#runner )

## Server

Run your a project using `./run server` (or its shortcut: `./run s`).
In development mode, you server will automatically reload on code changes.

```
$ ./run s

  => Auto-restarting on changes
  => Running development mode at http://0.0.0.0:4567
  => Ready [290ms]
  GET / 200 486ms - 241b
  GET / 200 116ms - 241b
  GET /css/application.css 200 10ms - 36b
  GET /js/application.js 200 2ms - 1b
```

## Console

And you get a convenient REPL console.

```js
$ ./run c

  > 2 + 4
  6
  > app.get('env')
  'development'
```


## Entry point

Your Expo app behaves just like any Node package would. It has a main entry
point, `app`, which is a Connect app.

```js
$ node

  > app = require('.')
  { ... }
  > app.get('env')
  'development'
  > app.conf('database').username
  'youruser'
  > http.createServer(app).listen(5678);
```


## Tests (via mocha)

Tests are available via Mocha and Chai. Just like all Node packages, the command 
is the standard `npm test`.

```
$ npm test

  > myapp@0.1.0 test
  > ./node_modules/.bin/mocha -R spec

  >  App loaded for test environment

    App
      Homepage should work (799ms)
      should have the right env

    2 tests complete (807 ms)
```

[Read about tests >]( guide.html#tests )


How it looks
============

## Initializers

Here's the main entry point, and the main initializer.
You can dump JS files in `app/initializers/` and they will be automatically
loaded when the app is loaded.

```js
$ cat app.js

  var app = module.exports = require('express')();
  require('expo')(app, __dirname);


$ cat app/initializers/app.js

  var express = require('express');

  module.exports = function(app) {
    app.set('view engine', 'jade');
    app.use(express['static'](app.path('public')));
    app.use(express.methodOverride());
    app.use(express.bodyParser());

    app.configure('development', function() {
      app.use(express.favicon());
      app.use(express.logger('dev'));
      app.use(express.errorHandler());
    });
  };
```


## Routes

Routes in app/routes are automatically loaded.

```js
$ cat app/routes/home.js

  module.exports = function(app) {
    app.get('/', function(req, res) {
      res.render('index', {});
    });
  };
```

[Read about routes >]( guide.html#routes )


## Helpers

These will be available in your views automatically.

```js
$ cat app/helpers/name_helper.js

  module.exports = {
    hello: function(name) {
      return "Hello " + name;
    }
  };

$ cat app/views/hello.jade

  div= hello("Rico")
```

[Read about helpers >]( guide.html#helpers )


## Configuration

Expo provides you helpers for Yaml and JSON configuration files via
`app.conf()`.

```js
$ cat config/database.yml

  production:
    username: 'rsc'
    dbname: 'foobar_production'
  development:
    username: 'rsc'
    dbname: 'foobar_development'

$ ./run console

  > app.conf('database').dbname
  "foobar_development"
```


Misc
====


Acknowledgements
----------------

© 2013, Rico Sta. Cruz. Released under the [MIT 
License](http://www.opensource.org/licenses/mit-license.php).

[Image] was taken from Flickr, licensed under Creative Commons.

**Expo** is authored and maintained by [Rico Sta. Cruz][rsc] with help from its 
[contributors][c]. It is sponsored by my startup, [Nadarei, Inc][nd].

 * [My website](http://ricostacruz.com) (ricostacruz.com)
 * [Nadarei, Inc.](http://nadarei.co) (nadarei.co)
 * [Github](http://github.com/rstacruz) (@rstacruz)
 * [Twitter](http://twitter.com/rstacruz) (@rstacruz)

[rsc]: http://ricostacruz.com
[c]:   http://github.com/rstacruz/expo/contributors
[nd]:  http://nadarei.co
[connect-assets]: https://github.com/adunkman/connect-assets
[Express]: http://expressjs.com/
[connect]: https://github.com/senchalabs/connect
[Node.js]: http://nodejs.org/
[commander.js]: https://github.com/visionmedia/commander.js
[Sequelize]: http://www.sequelizejs.com
[Mocha]: http://visionmedia.github.io/mocha
[supervisor]: https://github.com/isaacs/node-supervisor
[Chai]: http://chaijs.com/
[Chai should]: http://chaijs.com/guide/styles/#should
[Chai assert]: http://chaijs.com/api/assert/
[Superagent]: https://npmjs.org/package/superagent
[Sinon.js]: http://sinonjs.org/
[Image]:http://www.flickr.com/photos/feuilllu/7473428030/sizes/l/in/photostream/
