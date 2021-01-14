import sinon from 'sinon';
import MySQL from './MySQL';
import { assert } from 'chai';

describe('Unit test user/MySQL class', () => {
  afterEach(() => {
    sinon.restore();
  });

  describe('When involking createConnection', () => {
    describe('Should configure Sequelize', () => {
      it('With the given paremeters', () => {
        const database = 'database';
        const username = 'username';
        const password = 'password';
        const host = 'host';
        const port = 9494;

        const connection = MySQL.createConnection(
          database,
          username,
          password,
          host,
          port
        );

        assert.equal(database, connection.config.database);
        assert.equal(username, connection.config.username);
        assert.equal(password, connection.config.password);
        assert.equal(host, connection.config.host);
        assert.equal(port, Number(connection.config.port));
      });
    });
  });
});
