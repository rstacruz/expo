module.exports = {
  development: {
    dialect: 'sqlite',
    storage: 'db/development.sqlite'
  },
  test: {
    dialect: 'sqlite',
    database: 'dbname',
    username: 'username',
    password: ''
  },
  production: {
    dialect: 'sqlite',
    database: 'dbname',
    username: 'username',
    password: ''
  }
};
