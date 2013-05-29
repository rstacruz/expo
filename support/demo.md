# Expo demo

Expo lets you start up sites very fast.
Create a project using the `expo` command. Here we'll use `--bare`, which
generates the bare minimum:

```
$ expo --bare hello

  mkdir: hello/
         hello/Readme.md
         hello/run
         hello/app.js
         hello/.gitignore
         hello/package.json
  mkdir: hello/app/
  mkdir: hello/app/initializers/
         hello/app/initializers/app.js
  mkdir: hello/app/routes/
         hello/app/routes/home.js
  mkdir: hello/app/views/
         hello/app/views/index.jade
         hello/app/views/layout.jade

  install dependencies:
    $ cd hello
    $ npm install && npm shrinkwrap

  run the app:
    $ ./run server

  more info:
    $ ./run --help
```

[Read about creating projects >]( .#expo-executable )

## Full setup

...But this isn't always that useful, since you probably will need assets,
databases, sessions, tests, helpers and other doodads.

Use `expo` without switches to generate the default layout:

```
$ expo myproject

  mkdir: myproject/
         myproject/Readme.md
         myproject/run
         myproject/app.js
         myproject/.gitignore
         myproject/package.json
  mkdir: myproject/app/
  mkdir: myproject/app/assets/
  mkdir: myproject/app/assets/css/
         myproject/app/assets/css/application.styl
  mkdir: myproject/app/assets/js/
         myproject/app/assets/js/application.js
  mkdir: myproject/app/assets/img/
         myproject/app/assets/img/.gitkeep
  mkdir: myproject/app/initializers/
         myproject/app/initializers/app.js
         myproject/app/initializers/assets.js
         myproject/app/initializers/sessions.js
  mkdir: myproject/app/helpers/
         myproject/app/helpers/app_helper.js
  mkdir: myproject/app/routes/
         myproject/app/routes/home.js
  mkdir: myproject/app/views/
         myproject/app/views/index.jade
         myproject/app/views/layout.jade
  mkdir: myproject/config/
         myproject/config/database.yml.example
         myproject/config/secret_token.yml
  mkdir: myproject/db/
         myproject/db/.gitkeep
  mkdir: myproject/lib/
         myproject/lib/.gitkeep
  mkdir: myproject/public/
         myproject/public/robots.txt
  mkdir: myproject/test/
         myproject/test/setup.js
         myproject/test/app_test.js
```

[Read about creating projects >]( .#expo-executable )

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

[Read about the runner >]( .#runner )

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

```
$ ./run c

  > 2 + 4
  6
  > app.get('env')
  'development'
```


## Entry point

Your Expo app behaves just like any Node package would. It has a main entry
point, `app`, which is a Connect app.

```
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

[Read about tests >]( .#tests )


## So how does the code look like?

Here's the main entry point, and the main initializer.
You can dump JS files in `app/initializers/` and they will be automatically
loaded when the app is loaded.

```
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

```
$ cat app/routes/home.js

  module.exports = function(app) {
    app.get('/', function(req, res) {
      res.render('index', {});
    });
  };
```

[Read about routes >]( .#routes )


## Helpers

These will be available in your views automatically.

```
$ cat app/helpers/name_helper.js

  module.exports = {
    hello: function(name) {
      return "Hello " + name;
    }
  };

$ cat app/views/hello.jade

  div= hello("Rico")
```

[Read about helpers >]( .#helpers )


## Configuration

Expo provides you helpers for Yaml and JSON configuration files via
`app.conf()`.

```
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
