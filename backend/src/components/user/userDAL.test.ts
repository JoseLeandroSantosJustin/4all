import config from 'config';
import sinon from 'sinon';
import MySQL from './MySQL';
import { startConnection, createUser, readAllUsers } from './userDAL';
import { assert } from 'chai';
import User from './User';

describe('Unit test user/userDAL', () => {
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

  describe('When involking createUser', () => {
    describe('Should involke startConnection, execQuery with insert statement and closeConnection', () => {
      it('If there are no errors in the execQuery', async () => {
        const user = new User('Teste', 'Teste@teste.com', '12345678');

        // @ts-ignore
        sinon.stub(MySQL, 'startConnection').returns('connection');
        const mysqlMock = sinon.mock(MySQL);
        const execQueryExpectation = mysqlMock
          .expects('execQuery')
          .withArgs(
            'connection',
            'INSERT INTO user(email, password, name) VALUES(?, ?, ?)',
            [user.getEmail(), user.getPassword(), user.getName()]
          )
          .resolves(true);

        const closeConnectionExpectation = mysqlMock
          .expects('closeConnection')
          .returns('');

        await createUser(user).then((result) => {
          // @ts-ignore
          execQueryExpectation.verify();
          // @ts-ignore
          closeConnectionExpectation.verify();
          assert.isTrue(result);
        });
      });

      it('If execQuery throws an error', async () => {
        const user = new User('Teste', 'Teste@teste.com', '12345678');

        // @ts-ignore
        sinon.stub(MySQL, 'startConnection').returns('connection');
        const mysqlMock = sinon.mock(MySQL);
        const execQueryExpectation = mysqlMock
          .expects('execQuery')
          .withArgs(
            'connection',
            'INSERT INTO user(email, password, name) VALUES(?, ?, ?)',
            [user.getEmail(), user.getPassword(), user.getName()]
          )
          .rejects('Error caught');

        const closeConnectionExpectation = mysqlMock
          .expects('closeConnection')
          .returns('');

        await createUser(user).catch((error) => {
          // @ts-ignore
          execQueryExpectation.verify();
          // @ts-ignore
          closeConnectionExpectation.verify();
          assert.equal(error, 'Error caught');
        });
      });
    });
  });

  describe('When involking readAllUsers', () => {
    describe('Should involke startConnection, execQuery with select statement and closeConnection', () => {
      it('If there are no errors in the execQuery', async () => {
        // @ts-ignore
        sinon.stub(MySQL, 'startConnection').returns('connection');
        const mysqlMock = sinon.mock(MySQL);
        const execQueryExpectation = mysqlMock
          .expects('execQuery')
          .withArgs('connection', 'SELECT * FROM user')
          .resolves(true);

        const closeConnectionExpectation = mysqlMock
          .expects('closeConnection')
          .returns('');

        await readAllUsers().then((result) => {
          // @ts-ignore
          execQueryExpectation.verify();
          // @ts-ignore
          closeConnectionExpectation.verify();
          assert.isTrue(result);
        });
      });

      it('If execQuery throws an error', async () => {
        // @ts-ignore
        sinon.stub(MySQL, 'startConnection').returns('connection');
        const mysqlMock = sinon.mock(MySQL);
        const execQueryExpectation = mysqlMock
          .expects('execQuery')
          .withArgs('connection', 'SELECT * FROM user')
          .rejects('Error caught');

        const closeConnectionExpectation = mysqlMock
          .expects('closeConnection')
          .returns('');

        await readAllUsers().catch((error) => {
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
