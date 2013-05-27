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
   * Routing API *-- via [express.js]*
   * Middleware support *-- via [connect]*
 * __Assets__
   * Asset pipeline *-- via [connect-assets]*
   * Support for CoffeeScript, Less, Stylus
 * __Database__
   * Database ORM *-- via [Sequelize]*
   * Database migrations
 * __Tests__
   * Tests *-- via [Mocha]*
   * Assertions *-- via [Chai]*
   * Integration tests *-- via [superagent]*
 * __Utilities__
   * Command-line tasks *-- via [commander.js]*
   * Auto-restarting on changes *-- via [supervisor]*
   * Logging
   * Config file loading

[Try it >](#download)

Getting started
---------------

Create your first Expo application by installing the `expo` command and 
generating your application with it.

``` cmd
$ npm install -g expo
$ expo yourapp
```

#### File structure

This gets you a new Node.js project with the following files. (Every
directory here is optional: you may delete any that you don't need!)

``` files
yourapp/
  app/
    assets/
    views/
    helpers/
    initializers/
    migrations/
    routes/
    tasks/
  config/
  lib/
  public/
  test/
  app.js
  run*
  package.json
```

#### Boot up your stack

Now initialize your environment by installing all `npm` dependencies.
And run your app with the included `run` script.

``` cmd
$ cd yourapp
$ npm install
$ npm shrinkwrap
```

``` cmd
$ ./run server
=> env: development
=> url: http://0.0.0.0:4567/
=> Ready [480ms]
```

Summary
-------

### NPM package
You can use your project as any other Node package. Your app will have one main 
entry point (like most Node packages) that you can programatically use anywhere.

``` js
var app = require('yourapp').load();

// Use models:
var Article = require('yourapp/lib/article');
Article.find({ id: 20 });

// Fetch config:
app.conf('database').hostname;

// Make it work:
app.listen(3000);
```

[Read more >](#package)

### Command-line runner

Just do `./run server` or `./run console` or define more custom tasks.

``` cmd
$ ./run --help

  Commands:
    server              Starts the server
    console             Opens the console
    db:migrate          Performs database migrations
    assets:precompile   Compiles asset files
```

[Read more >](#command-line-tasks)

### Assets

Just add your asset files in `app/assets/`. JavaScript, CoffeeScript, Less, 
     Stylus are supported.

``` files
app/
  assets/
    js/
      application.coffee
      jquery.js
    css/
      application.styl
    img/
      background.jpg
```


# Features

## Tasks

### Defining your own tasks

Do things well.

Misc
====

Acknowledgements
----------------

© 2013, Rico Sta. Cruz. Released under the [MIT 
License](http://www.opensource.org/licenses/mit-license.php).

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
[express.js]: http://expressjs.com/
[connect]: https://github.com/senchalabs/connect
[Node.js]: http://nodejs.org/
[commander.js]: https://github.com/visionmedia/commander.js
[Sequelize]: http://www.sequelizejs.com
[Mocha]: http://visionmedia.github.io/mocha
[supervisor]: https://github.com/isaacs/node-supervisor
[Chai]: http://chaijs.com/
[Superagent]: https://npmjs.org/package/superagent

