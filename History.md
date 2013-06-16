## v0.1.4 - unreleased

 * Expo:

   * Console: it now triggers the 'console' event allowing you to hook things, 
   allowing you to hook

   * App: implement `app.loadConsole()`. This allows you to run `app = 
   require('app').loadConsole()` in any REPL shell (like `coffee`).

   * There's now a default `uncaughtException` handler to terminate the 
   application when one happens.

 * Template:

   * The `package.json` now gives you the command `npm run autotest` to 
   continuously run tests.

## v0.1.3

Expo:

 * Config: allow 'default' configuration scope.
 * CLI: improve `expo --help` help text.
 * Add support for 404 and 500 error handlers.
 * Log timestamps in production mode.
 * Template: consolidate sessions into the main initializer.
 * App: add `add.emit()` function.

Assets:

 * Read config out of `assets.yml` instead.

## v0.1.2 - May 30, 2013

App generator:

 * New projects now have a `repository` in package.json.
 * New projects now default to version "0.0.1".
 * Fix the default tasks.
 * Fix the 'npm install' error.
 * Automatically gitignore compiled assets.
 * Move test packages into devDependencies.
 * Remove pg/mysql by default.

Expo:

 * CLI tasks that aren't returning JS code are now ignored.

Assets:

 * Fix asset precompilation.

## v0.1.1 - May 30, 2013

Initial feature-complete release.
