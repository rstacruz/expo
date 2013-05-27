module.exports = {
  development: {
    dialect: 'sqlite',
    storage: 'db/development.sqlite'
  },
  test: {
    dialect: 'postgres',
    database: 'dbname',
    username: 'rsc',
    password: '',
    port: 5432
  },
  production: {
    dialect: 'postgres',
    database: 'dbname',
    username: 'username',
    password: '',
    port: 5432
  }
};
