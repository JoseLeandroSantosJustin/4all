import mysql from 'mysql2';

export default class MySQL {
  /**
   * Create a pool connection
   * @param database Database schema
   * @param username Username to access database
   * @param password Password to access database
   * @param host Database host machine
   * @param port Host port
   * @returns MySQL pool connection
   */
  public static startConnection(
    database: string,
    username: string,
    password: string,
    host: string,
    port: number
  ): mysql.Pool {
    return mysql.createPool({
      database: database,
      user: username,
      password: password,
      host: host,
      port: port,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    });
  }

  /**
   * @param connection MySQL pool connection
   * @param query Query to be executed
   * @param options Query values
   */
  public static execQuery(
    connection: mysql.Pool,
    query: string,
    options?: Array<any>
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      connection.query(query, options, (err, result) => {
        if (err) reject(err);

        resolve(result);
      });
    });
  }

  /**
   * End a pool connection
   * @param connection MySQL pool connection
   */
  public static closeConnection(connection: mysql.Pool): void {
    connection.end();
  }
}
