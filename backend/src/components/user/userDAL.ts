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

const createUser = (user: User): Promise<any> => {
  return new Promise((resolve, reject) => {
    const connection = startConnection();

    MySQL.execQuery(
      connection,
      'INSERT INTO user(email, password, name) VALUES(?, ?, ?)',
      [user.getEmail(), user.getPassword(), user.getName()]
    )
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

const readAllUsers = (): Promise<Array<any>> => {
  return new Promise((resolve, reject) => {
    const connection = startConnection();

    MySQL.execQuery(connection, 'SELECT * FROM user')
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

export { startConnection, createUser, readAllUsers };
