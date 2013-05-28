module.exports = {
  development: {
    dialect: 'sqlite',
    storage: 'db/development.sqlite'
  },
  test: {
    dialect: 'postgres',
    database: 'expo_test',
    username: 'rsc',
    password: '',
    port: 5432
  },
  production: {
    dialect: 'mysql',
    database: 'expo_production',
    username: 'root',
    password: ''
  }
};
