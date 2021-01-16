import mysql from 'mysql2';
import config from 'config';
import MySQL from './MySQL';
import User from './User';
import moment from 'moment';

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

/**
 * Insert a token into database and bounds with user
 */
const createUserHasToken = (token: string, user: User): Promise<any> => {
  return new Promise((resolve, reject) => {
    const connection = startConnection();

    MySQL.execQuery(
      connection,
      'INSERT INTO user_has_token(token, last_access_date, id_user) VALUES(?, ?, ?)',
      [token, moment().format('YYYY-MM-DD HH:mm:ss'), user.getId()]
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

const readUserHasTokenByTokenAndId = (
  token: string,
  user: User
): Promise<any> => {
  return new Promise((resolve, reject) => {
    const connection = startConnection();

    MySQL.execQuery(
      connection,
      'SELECT * FROM user_has_token WHERE token = ? AND id_user = ?',
      [token, user.getId()]
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

/**
 * Update last_access_date state from user_has_token from database
 */
const updateLastAccessDateUserHasTokenByTokenAndId = (
  token: string,
  id: number
): Promise<Array<any>> => {
  return new Promise((resolve, reject) => {
    const connection = startConnection();

    MySQL.execQuery(
      connection,
      'UPDATE user_has_token SET last_access_date = ? WHERE token = ? AND id_user = ?',
      [moment().format('YYYY-MM-DD HH:mm:ss'), token, id]
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

/**
 * Update is_connected state from user_has_token from database
 */
const updateIsConnectedUserHasTokenByTokenAndId = (
  token: string,
  id: number
): Promise<Array<any>> => {
  return new Promise((resolve, reject) => {
    const connection = startConnection();

    MySQL.execQuery(
      connection,
      'UPDATE user_has_token SET is_connected = 0 WHERE token = ? AND id_user = ?',
      [token, id]
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

export {
  startConnection,
  createUserHasToken,
  readUserHasTokenByTokenAndId,
  updateLastAccessDateUserHasTokenByTokenAndId,
  updateIsConnectedUserHasTokenByTokenAndId
};
