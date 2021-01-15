import sinon from 'sinon';
import MySQL from './MySQL';
import { assert } from 'chai';

describe('Unit test login/MySQL class', () => {
  afterEach(() => {
    sinon.restore();
  });

  describe('When involking startConnection', () => {
    describe('Should configure MySQL pool connection', () => {
      it('With the given paremeters', () => {
        const database = 'database';
        const username = 'username';
        const password = 'password';
        const host = 'host';
        const port = 9494;

        const connection = MySQL.startConnection(
          database,
          username,
          password,
          host,
          port
        );

        // @ts-ignore
        assert.equal(connection.config.connectionConfig.database, database);
        // @ts-ignore
        assert.equal(connection.config.connectionConfig.user, username);
        // @ts-ignore
        assert.equal(connection.config.connectionConfig.password, password);
        // @ts-ignore
        assert.equal(connection.config.connectionConfig.host, host);
        // @ts-ignore
        assert.equal(connection.config.connectionConfig.port, port);
      });
    });

    xit('When involking execQuery');

    describe('When involking "closeConnection"', function () {
      describe('Should involke "end" method of the given parameter', function () {
        it('Then close the given connection', function () {
          const connection = {
            end: () => {
              null;
            }
          };
          const connectionSpy = sinon.spy(connection, 'end');

          // @ts-ignore
          MySQL.closeConnection(connection);
          assert.isTrue(connectionSpy.calledOnce);
          connectionSpy.restore();
        });
      });
    });
  });
});
