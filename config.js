
module.exports = {
    port: 3001,
    ip: "192.168.0.100:",
    dbConfig: {
      user: 'postgres',
      host: 'localhost',
      database: 'divide_ai_db',
      password: 'postgres',
      port: 5432,
    },
    jwtSecret: 'mysecretkey',

    currentUser: {
      name: 'none'
    }
  };