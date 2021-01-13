import sinon from 'sinon';
import MySQL from './MySQL';
import { assert } from 'chai';
import { logger } from './utils';

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

  describe('When involking isConnected', () => {
    describe("Should involke 'authenticate' from the given connection", () => {
      describe('Then resolve true', () => {
        it('If works properly', async () => {
          const connection = MySQL.createConnection(
            'database',
            'username',
            'password',
            'host',
            3306
          );

          sinon.mock(connection).expects('authenticate').resolves();

          await MySQL.isConnected(connection).then((result) => {
            assert.isTrue(result);
          });
        });
      });

      describe('Then resolve false', () => {
        it('If an error is caught', async () => {
          const connection = MySQL.createConnection(
            'database',
            'username',
            'password',
            'host',
            3306
          );

          sinon
            .mock(connection)
            .expects('authenticate')
            .rejects({ message: 'Error message', stack: 'Error stack' });

          sinon.mock(logger).expects('error').withArgs({
            message: 'Error message',
            stack: 'Error stack'
          });

          await MySQL.isConnected(connection).catch((result) => {
            assert.isFalse(result);
          });
        });
      });
    });
  });
});
