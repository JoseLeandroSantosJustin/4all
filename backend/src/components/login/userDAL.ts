import mysql from 'mysql2';
import config from 'config';
import MySQL from './MySQL';
import User from './User';

const startConnection = (): mysql.Pool => {
  const mysqlConfig = config.get('mysql');

  return MySQL.startConnection(
    mysqlConfig.database,
    mysqlConfig.username,
    mysqlConfig.password,
    mysqlConfig.host,
    mysqlConfig.port
  );
};

const readUserByEmail = (user: User): Promise<any> => {
  return new Promise((resolve, reject) => {
    const connection = startConnection();

    MySQL.execQuery(connection, 'SELECT * FROM user WHERE email = ?', [
      user.getEmail()
    ])
      .then((result) => {
        MySQL.closeConnection(connection);
        resolve(result);
      })
      .catch((error) => {
        MySQL.closeConnection(connection);
        reject(error);
      });
  });
};

export { startConnection, readUserByEmail };
