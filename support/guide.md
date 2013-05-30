Features
========

## Expo executable

## Routes

## Database

## Migrations

Type `./run gen-migration` to create your first migration file. This creates a 
file in `app/migrations/`.

``` js
/* app/migrations/20130506-default.md */
module.exports = {
  up: function(migration, DataTypes, done) {
    // logic for transforming into the new state
  },

  down: function(migration, DataTypes, done) {
    // logic for reverting the changes
  }
}
```

### Writing your first migration

Fill up the `up` and `down` by issuing Sequelize SQL commands on `migration`, 
and calling `done` upon completion.  See Sequelize's
[migration documentation][Migration] for details.

``` js
up: function(migration, DataTypes, done) {
  migration.createTable('nameOfTheNewTable',
  {
    attr1: DataTypes.STRING,
    attr2: DataTypes.INTEGER,
    attr3: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false
    }
  })
  .complete(done);
},

down: function(migration, DataTypes, done) {
  migration.dropAllTables().complete(done);
}
```

### Performing migrations

To execute your migrations, just do `./run db-migrate`. Make sure that you have 
your database created first (`./run db-create`). Sequelize will automatically 
track which migrations have been ran.

``` cmd
$ ./run db-migrate

  ...
```

More info about migrations in Sequelize's documentation.

[Sequelize Migrations guide >][Migration]

## Helpers

## Assets

See the `connect-assets` documentation for more info.

[Connect assets guide >][connect-assets]

Runner
------

All applications come with a `run` executable. Use `./run --help` to see a list 
of options.

``` cmd
$ ./run --help

  Usage: run [options] [command]

  Commands:

    server [port] [..]     Starts the server (alias: "s")
    console                Opens a console (alias: "c")
    runner [cmd]           Runs a command (alias: "r")
    db-create              Creates the environment's database
    db-drop                Drops the environment's database
    db-migrate             Run database migrations
    assets-precompile      Precompiles asset files

  Options:

    -h, --help       output usage information
    -V, --version    output the version number
    -e, --env [env]  Environment to start in [develompent]
```

### Running the application

It's what's used to run the application:

``` cmd
$ ./run server

  => Auto-restarting on changes
  => Running development mode at http://0.0.0.0:4567
  => Ready [451ms]
  GET / 200 929ms - 307b
```

### Console

Start a console by using `./run console`. This starts a REPL shell. You can use 
the object `app` to refer to your application.

``` cmd
$ ./run console

  > app.get('env')
  'development'
  > %
```


Tests
-----

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

#### Read more

See these third-party guides for more info.

[Mocha >][Mocha] *A guide to things*

[Chai (should) >][Chai should] *Guide to the `.should` syntax*

[Chai (assert) >][Chai assert] *Guide to `assert()` API*

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
[Demo]: https://raw.github.com/rstacruz/expo/master/support/demo.txt
[Migration]: http://sequelizejs.com/documentation#migrations-skeleton
