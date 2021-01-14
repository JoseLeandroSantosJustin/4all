import { Sequelize } from 'sequelize';

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
      dialect: 'mysql'
    });
  }
}
