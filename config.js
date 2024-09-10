
module.exports = {
    port: 3001,
    ip: "192.168.0.102",
    dbConfig: {
      user: 'postgres',
      host: 'localhost',
      database: 'my_app_pgp',
      password: 'postgres',
      port: 5432,
    },
    jwtSecret: 'mysecretkey',
  };