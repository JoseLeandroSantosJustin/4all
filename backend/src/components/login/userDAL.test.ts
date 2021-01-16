import config from 'config';
import sinon from 'sinon';
import MySQL from './MySQL';
import { startConnection, readUserByEmail } from './userDAL';
import { assert } from 'chai';
import User from './User';

describe('Unit test login/userDAL', () => {
  beforeEach(() => {
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

  describe('When involking readUserByEmail', () => {
    describe('Should involke startConnection, execQuery with select statement and closeConnection', () => {
      it('If there are no errors in the execQuery', async () => {
        const email = 'teste@teste.com';
        const password = 'password';
        const user = new User(email, password);

        // @ts-ignore
        sinon.stub(MySQL, 'startConnection').returns('connection');
        const mysqlMock = sinon.mock(MySQL);
        const execQueryExpectation = mysqlMock
          .expects('execQuery')
          .withArgs('connection', 'SELECT * FROM user WHERE email = ?', [
            user.getEmail()
          ])
          .resolves(true);

        const closeConnectionExpectation = mysqlMock
          .expects('closeConnection')
          .returns('');

        await readUserByEmail(user).then((result) => {
          // @ts-ignore
          execQueryExpectation.verify();
          // @ts-ignore
          closeConnectionExpectation.verify();
          assert.isTrue(result);
        });
      });

      it('If execQuery throws an error', async () => {
        const email = 'teste@teste.com';
        const password = 'password';
        const user = new User(email, password);

        // @ts-ignore
        sinon.stub(MySQL, 'startConnection').returns('connection');
        const mysqlMock = sinon.mock(MySQL);
        const execQueryExpectation = mysqlMock
          .expects('execQuery')
          .withArgs('connection', 'SELECT * FROM user WHERE email = ?', [
            user.getEmail()
          ])
          .rejects('Error caught');

        const closeConnectionExpectation = mysqlMock
          .expects('closeConnection')
          .returns('');

        await readUserByEmail(user).catch((error) => {
          // @ts-ignore
          execQueryExpectation.verify();
          // @ts-ignore
          closeConnectionExpectation.verify();
          assert.equal(error, 'Error caught');
        });
      });
    });
  });
});
