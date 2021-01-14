import { Sequelize } from 'sequelize';
import { logger } from './utils';

export default class MySQL {
  /**
   * Create a connection using by instantiating Sequelize
   * @param database Database schema
   * @param username Username to access database
   * @param password Password to access database
   * @param host Database host machine
   * @param port Host port
   * @returns Sequelize connection
   */
  public static createConnection(
    database: string,
    username: string,
    password: string,
    host: string,
    port: number
  ): Sequelize {
    return new Sequelize(database, username, password, {
      host: host,
      port: port,
      dialect: 'mysql',
      define: {
        freezeTableName: true,
        timestamps: false
      }
    });
  }

  /**
   * Method to test connection
   * @param connection Sequelize instance
   * @returns Throws an error if is not connected
   */
  public static isConnected(connection: Sequelize): Promise<boolean> {
    return new Promise((resolve, reject) => {
      connection
        .authenticate()
        .then(() => {
          resolve(true);
        })
        .catch((error) => {
          logger.error({
            message: error.message,
            stack: error.stack
          });

          reject(false);
        });
    });
  }
}
