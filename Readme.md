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

Expo is called a *meta-framework* as it's a glue that lets you build [Express] 
apps together with multiple packages.

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
    views/
    helpers/
    initializers/
    migrations/
    routes/
    tasks/
  assets/
    css/
    js/
    img/
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
*(See: [install], [shrinkwrap])*
You can run your app with the included `run` script afterwards.

``` cmd
$ cd yourapp
$ npm install && npm shrinkwrap
```

``` cmd
$ ./run server
=> env: development
=> url: http://0.0.0.0:4567/
=> Ready [480ms]
```

#### Let's begin

It's time to begin! Let's learn about making your first routes and views for 
your new app.

[Routes Guide >](#routes)

Summary of features
-------------------

#### Routes

Routes are supported via [Express]. Just add your route files to `app/routes/` 
and everything else will be taken care of for you.

``` js
// app/routes/home.js
module.exports = function(app) {
  app.get('/', function(req, res) {
    res.send("Hola, mundo!");
  });
};
```

#### Command-line runner

Just do `./run server` or `./run console`. You may also define custom tasks you 
may need in your app.

``` cmd
$ ./run --help

  Commands:
    server              Starts the server
    console             Opens the console
    db:migrate          Performs database migrations
    assets:precompile   Compiles asset files
    ...
```

#### Assets

Just add your asset files in `app/assets/`. JavaScript, CoffeeScript, Less, 
     Stylus are supported. They will be compiled, concatenated, and compressed 
     as needed.

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

#### NPM package
You can use your project as any other Node package. Your app will have one main 
entry point (like most Node packages) that you can programatically use anywhere.

``` js
var app = require('yourapp').load();

// Use models:
var Article = require('yourapp/lib/article');
Article.find({ id: 20 });

// Fetch config:
app.conf('database').hostname;
```

[Read more >](#routes)

# Features

## Expo executable

## Routes

## Database

## Migrations

## Helpers

## Tasks

## Assets

## Tests

### Running tests

To run tests, use `npm test`, just as you would for any Node package. A 
freshly-minted app will have some placeholder tests in `test/` -- try it out.

``` cmd
$ npm test

  > ./node_modules/.bin/mocha -R spec
  debug: App loaded for test environment
  ..

  2 tests complete (400ms)
```

### Creating tests

Create a test as a JS file in the `test/` folder with the filename the ends in 
`_test.js`.

``` js
/* test/article_test.js */
var Article = require('../app/lib/article');

describe('Article', function() {
  it('should work', function() {
    var a = Article.build({ title: "Doing things" });
    a.title.should.equal("Doing things");
  });
});
```

### Using other packages

You may want to use other packages, like say, [Sinon.js] for mocks and stubs.
Just load them in the `test_helper.js` file as needed.

``` js
/* test/test_helper.js */
global.sinon = require('sinon');
```

### Read more

See these third-party guides for more info.

[Mocha >][Mocha] *A guide to things*

[Chai (should) >][Chai should] *Guide to the `.should` syntax*

[Chai (assert) >][Chai assert] *Guide to `assert()` API*

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

[shrinkwrap]: https://npmjs.org/doc/shrinkwrap.html
[install]: https://npmjs.org/doc/install.html
