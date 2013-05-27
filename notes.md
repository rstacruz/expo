Features
--------

Core:

- Initializers (done)
- Tasks (done)
- Supervisor (done)
- Models (done)
- Model linking (done)
- Settings.yml (done)
- Environment (done)
- Public (done)
- Extensions support (done)
- Logging (done?)
- Sessions (done)
- Secret tokens (done)
- Tests (done)
- Helpers (done)

- Generator bin
- Error

Sequelize:

- Db Migration (done)

Connect:
- Asset pre-compilation (?)
- Asset serving (done)

Files
-----

package.json
app
config/app.coffee
config/settings.yml
config/database.yml
routes/
lib/
tasks/
public/

# package.json
  dependencies: {
    'expo': '~0.1.0',
    'expo-sequelize': '~0.1.0',
    'expo-connect-assets': '~0.1.0'
  }


# app
#!/usr/bin/env node
require('expo')(__dirname).go(process.argv);

# app.coffee
module.exports = (app) ->
  app.use express.logger('dev')
  app.use express.bodyParser()
  app.use app.router

# models/hello.coffee
module.exports = (app) ->
  Sq = require('sequelize')

# routes/home.coffee
module.exports = (app) ->
  app.get '/', (req, res) ->
    res.render 'home'

# migrations/m1.coffee
module.exports = (app, db) ->
  db.create_table


config/
lib/
app/
  assets/
  views/
  helpers/
  initializers/
  migrations/
  routes/
  tasks/
public/
test/
node_modules/
app.js
run*
package.json

------------

# Models
## Project
### db
### task

