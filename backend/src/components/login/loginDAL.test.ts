import config from 'config';
import sinon from 'sinon';
import MySQL from './MySQL';
import {
  startConnection,
  createUserHasToken,
  readUserHasTokenByToken,
  updateLastAccessDateUserHasTokenByTokenAndId,
  updateIsConnectedUserHasTokenByTokenAndId
} from './loginDAL';
import { assert } from 'chai';
import User from './User';
import moment from 'moment';

describe('Unit test login/loginDAL', () => {
  afterEach(() => {
    sinon.restore();
  });

  describe('When involking startConnection', () => {
    it('Should involke MySQL.startConnection with mysql config variables', () => {
      const mysqlConfig = config.get('mysql');

      const startConnectionExpectation = sinon
        .mock(MySQL)
        .expects('startConnection')
        .withArgs(
          mysqlConfig.database,
          mysqlConfig.username,
          mysqlConfig.password,
          mysqlConfig.host,
          mysqlConfig.port
        );

      startConnection();
      startConnectionExpectation.verify();
    });
  });

  describe('When involking createUserHasToken', () => {
    describe('Should involke startConnection, execQuery with insert statement and closeConnection', () => {
      it('If there are no errors in the execQuery', async () => {
        const token = 'token';
        const email = 'teste@teste.com';
        const password = 'password';
        const user = new User(email, password);

        // @ts-ignore
        sinon.stub(MySQL, 'startConnection').returns('connection');
        const mysqlMock = sinon.mock(MySQL);
        const execQueryExpectation = mysqlMock
          .expects('execQuery')
          .withArgs(
            'connection',
            'INSERT INTO user_has_token(token, last_access_date, id_user) VALUES(?, ?, ?)',
            [token, moment().format('YYYY-MM-DD HH:mm:ss'), user.getId()]
          )
          .resolves(true);

        const closeConnectionExpectation = mysqlMock
          .expects('closeConnection')
          .returns('');

        await createUserHasToken(token, user).then((result) => {
          // @ts-ignore
          execQueryExpectation.verify();
          // @ts-ignore
          closeConnectionExpectation.verify();
          assert.isTrue(result);
        });
      });

      it('If execQuery throws an error', async () => {
        const token = 'token';
        const email = 'teste@teste.com';
        const password = 'password';
        const user = new User(email, password);

        // @ts-ignore
        sinon.stub(MySQL, 'startConnection').returns('connection');
        const mysqlMock = sinon.mock(MySQL);
        const execQueryExpectation = mysqlMock
          .expects('execQuery')
          .withArgs(
            'connection',
            'INSERT INTO user_has_token(token, last_access_date, id_user) VALUES(?, ?, ?)',
            [token, moment().format('YYYY-MM-DD HH:mm:ss'), user.getId()]
          )
          .rejects('Error caught');

        const closeConnectionExpectation = mysqlMock
          .expects('closeConnection')
          .returns('');

        await createUserHasToken(token, user).catch((error) => {
          // @ts-ignore
          execQueryExpectation.verify();
          // @ts-ignore
          closeConnectionExpectation.verify();
          assert.equal(error, 'Error caught');
        });
      });
    });
  });

  describe('When involking readUserHasTokenByToken', () => {
    describe('Should involke startConnection, execQuery with select statement and closeConnection', () => {
      it('If there are no errors in the execQuery', async () => {
        const token = 'token';

        // @ts-ignore
        sinon.stub(MySQL, 'startConnection').returns('connection');
        const mysqlMock = sinon.mock(MySQL);
        const execQueryExpectation = mysqlMock
          .expects('execQuery')
          .withArgs(
            'connection',
            'SELECT * FROM user_has_token WHERE token = ?',
            [token]
          )
          .resolves(true);

        const closeConnectionExpectation = mysqlMock
          .expects('closeConnection')
          .returns('');

        await readUserHasTokenByToken(token).then((result) => {
          // @ts-ignore
          execQueryExpectation.verify();
          // @ts-ignore
          closeConnectionExpectation.verify();
          assert.isTrue(result);
        });
      });

      it('If execQuery throws an error', async () => {
        const token = 'token';

        // @ts-ignore
        sinon.stub(MySQL, 'startConnection').returns('connection');
        const mysqlMock = sinon.mock(MySQL);
        const execQueryExpectation = mysqlMock
          .expects('execQuery')
          .withArgs(
            'connection',
            'SELECT * FROM user_has_token WHERE token = ?',
            [token]
          )
          .rejects('Error caught');

        const closeConnectionExpectation = mysqlMock
          .expects('closeConnection')
          .returns('');

        await readUserHasTokenByToken(token).catch((error) => {
          // @ts-ignore
          execQueryExpectation.verify();
          // @ts-ignore
          closeConnectionExpectation.verify();
          assert.equal(error, 'Error caught');
        });
      });
    });
  });

  describe('When involking updateLastAccessDateUserHasTokenByTokenAndId', () => {
    describe('Should involke startConnection, execQuery with update statement and closeConnection', () => {
      it('If there are no errors in the execQuery', async () => {
        const token = 'token';
        const id = 94;

        // @ts-ignore
        sinon.stub(MySQL, 'startConnection').returns('connection');
        const mysqlMock = sinon.mock(MySQL);
        const execQueryExpectation = mysqlMock
          .expects('execQuery')
          .withArgs(
            'connection',
            'UPDATE user_has_token SET last_access_date = ? WHERE token = ? AND id_user = ?',
            [moment().format('YYYY-MM-DD HH:mm:ss'), token, id]
          )
          .resolves(true);

        const closeConnectionExpectation = mysqlMock
          .expects('closeConnection')
          .returns('');

        await updateLastAccessDateUserHasTokenByTokenAndId(token, id).then(
          (result) => {
            // @ts-ignore
            execQueryExpectation.verify();
            // @ts-ignore
            closeConnectionExpectation.verify();
            assert.isTrue(result);
          }
        );
      });

      it('If execQuery throws an error', async () => {
        const token = 'token';
        const id = 94;

        // @ts-ignore
        sinon.stub(MySQL, 'startConnection').returns('connection');
        const mysqlMock = sinon.mock(MySQL);
        const execQueryExpectation = mysqlMock
          .expects('execQuery')
          .withArgs(
            'connection',
            'UPDATE user_has_token SET last_access_date = ? WHERE token = ? AND id_user = ?',
            [moment().format('YYYY-MM-DD HH:mm:ss'), token, id]
          )
          .rejects('Error caught');

        const closeConnectionExpectation = mysqlMock
          .expects('closeConnection')
          .returns('');

        await updateLastAccessDateUserHasTokenByTokenAndId(token, id).catch(
          (error) => {
            // @ts-ignore
            execQueryExpectation.verify();
            // @ts-ignore
            closeConnectionExpectation.verify();
            assert.equal(error, 'Error caught');
          }
        );
      });
    });
  });

  describe('When involking updateIsConnectedUserHasTokenByTokenAndId', () => {
    describe('Should involke startConnection, execQuery with update statement and closeConnection', () => {
      it('If there are no errors in the execQuery', async () => {
        const token = 'token';
        const id = 94;

        // @ts-ignore
        sinon.stub(MySQL, 'startConnection').returns('connection');
        const mysqlMock = sinon.mock(MySQL);
        const execQueryExpectation = mysqlMock
          .expects('execQuery')
          .withArgs(
            'connection',
            'UPDATE user_has_token SET is_connected = 0 WHERE token = ? AND id_user = ?',
            [token, id]
          )
          .resolves(true);

        const closeConnectionExpectation = mysqlMock
          .expects('closeConnection')
          .returns('');

        await updateIsConnectedUserHasTokenByTokenAndId(token, id).then(
          (result) => {
            // @ts-ignore
            execQueryExpectation.verify();
            // @ts-ignore
            closeConnectionExpectation.verify();
            assert.isTrue(result);
          }
        );
      });

      it('If execQuery throws an error', async () => {
        const token = 'token';
        const id = 94;

        // @ts-ignore
        sinon.stub(MySQL, 'startConnection').returns('connection');
        const mysqlMock = sinon.mock(MySQL);
        const execQueryExpectation = mysqlMock
          .expects('execQuery')
          .withArgs(
            'connection',
            'UPDATE user_has_token SET is_connected = 0 WHERE token = ? AND id_user = ?',
            [token, id]
          )
          .rejects('Error caught');

        const closeConnectionExpectation = mysqlMock
          .expects('closeConnection')
          .returns('');

        await updateIsConnectedUserHasTokenByTokenAndId(token, id).catch(
          (error) => {
            // @ts-ignore
            execQueryExpectation.verify();
            // @ts-ignore
            closeConnectionExpectation.verify();
            assert.equal(error, 'Error caught');
          }
        );
      });
    });
  });
});
