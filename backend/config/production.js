module.exports = {
  mysql: {
    database: process.env.MYSQL_SCHEMA,
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT
  },
  node: {
    port: process.env.NODE_PORT
  },
  bcrypt: {
    salt: process.env.BCRYPT_SALT
  }
};
