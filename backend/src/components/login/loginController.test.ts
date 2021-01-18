import * as loginController from './loginController';
import { assert } from 'chai';
import sinon from 'sinon';
import * as userDAL from './userDAL';
import bcrypt from 'bcrypt';
import User from './User';
import * as utils from './utils';
import * as loginDAL from './loginDAL';

describe('Unit test login/loginController', () => {
  afterEach(() => {
    sinon.restore();
  });

  describe('When involking logon', () => {
    describe('Should reject', () => {
      describe('If email is not a string', () => {
        it('Is a number', async () => {
          await loginController
            // @ts-ignore
            .logon(94, '12345678')
            .catch((error) => {
              assert.equal(error.message, '"email" must be a string');
            });
        });

        it('Is a boolean', async () => {
          await loginController
            // @ts-ignore
            .logon(true, '12345678')
            .catch((error) => {
              assert.equal(error.message, '"email" must be a string');
            });
        });

        it('Is a array', async () => {
          await loginController
            // @ts-ignore
            .logon([], '12345678')
            .catch((error) => {
              assert.equal(error.message, '"email" must be a string');
            });
        });

        it('Is a object', async () => {
          await loginController
            // @ts-ignore
            .logon({}, '12345678')
            .catch((error) => {
              assert.equal(error.message, '"email" must be a string');
            });
        });

        it('Is empty', async () => {
          await loginController
            // @ts-ignore
            .logon('', '12345678')
            .catch((error) => {
              assert.equal(error.message, '"email" is not allowed to be empty');
            });
        });

        it('Is undefined', async () => {
          await loginController
            // @ts-ignore
            .logon(undefined, '12345678')
            .catch((error) => {
              assert.equal(error.message, '"email" is required');
            });
        });
      });

      describe('If password is not a string', () => {
        it('Is a number', async () => {
          await loginController
            // @ts-ignore
            .logon('teste@teste.com', 94)
            .catch((error) => {
              assert.equal(error.message, '"password" must be a string');
            });
        });

        it('Is a boolean', async () => {
          await loginController
            // @ts-ignore
            .logon('teste@teste.com', true)
            .catch((error) => {
              assert.equal(error.message, '"password" must be a string');
            });
        });

        it('Is a array', async () => {
          await loginController
            // @ts-ignore
            .logon('teste@teste.com', [])
            .catch((error) => {
              assert.equal(error.message, '"password" must be a string');
            });
        });

        it('Is a object', async () => {
          await loginController
            // @ts-ignore
            .logon('teste@teste.com', {})
            .catch((error) => {
              assert.equal(error.message, '"password" must be a string');
            });
        });

        it('Is empty', async () => {
          // @ts-ignore
          await loginController
            // @ts-ignore
            .logon('teste@teste.com', '')
            .catch((error) => {
              assert.equal(
                error.message,
                '"password" is not allowed to be empty'
              );
            });
        });

        it('Is undefined', async () => {
          await loginController
            // @ts-ignore
            .logon('teste@teste.com', undefined)
            .catch((error) => {
              assert.equal(error.message, '"password" is required');
            });
        });
      });

      describe('When involking userDAL.readUserByEmail', () => {
        describe('With the given parameters', () => {
          it('And it rejects', async () => {
            const email = 'teste@teste.com';
            const password = '12345678';
            const user = new User(email, password);

            const readUserByEmailExpectation = sinon
              .mock(userDAL)
              .expects('readUserByEmail')
              .withArgs(user)
              .rejects(new Error('Error caught'));

            await loginController.logon(email, password).catch((error) => {
              // @ts-ignore
              readUserByEmailExpectation.verify();
              assert.equal(error.message, 'Error caught');
            });
          });

          it('And bcrypt return false', async () => {
            const email = 'teste@teste.com';
            const password = '12345678';
            const user = new User(email, password);

            const readUserByEmailExpectation = sinon
              .mock(userDAL)
              .expects('readUserByEmail')
              .withArgs(user)
              .resolves([{ id: 94, password: 'encryptedPassword' }]);

            const compareSyncExpectation = sinon
              .mock(bcrypt)
              .expects('compareSync')
              .withArgs(password, 'encryptedPassword')
              .returns(false);

            await loginController.logon(email, password).catch((error) => {
              // @ts-ignore
              readUserByEmailExpectation.verify();
              // @ts-ignore
              compareSyncExpectation.verify();
              assert.equal(error.message, 'User and password do not match');
            });
          });

          it('Then involkes uniqid and createUserHasToken', async () => {
            const email = 'teste@teste.com';
            const password = '12345678';
            const user = new User(email, password);

            const readUserByEmailExpectation = sinon
              .mock(userDAL)
              .expects('readUserByEmail')
              .withArgs(user)
              .resolves([{ id: 94, password: 'encryptedPassword' }]);

            const compareSyncExpectation = sinon
              .mock(bcrypt)
              .expects('compareSync')
              .withArgs(password, 'encryptedPassword')
              .returns(true);

            const generateUniqIdExpectation = sinon
              .mock(utils)
              .expects('generateUniqId')
              .withArgs(94)
              .returns('token');

            const userWithId = new User(email, password, 94);
            const createUserHasTokenExpectation = sinon
              .mock(loginDAL)
              .expects('createUserHasToken')
              .withArgs('token', userWithId)
              .rejects(new Error('Error caught'));

            await loginController.logon(email, password).catch((error) => {
              // @ts-ignore
              readUserByEmailExpectation.verify();
              // @ts-ignore
              compareSyncExpectation.verify();
              // @ts-ignore
              generateUniqIdExpectation.verify();
              // @ts-ignore
              createUserHasTokenExpectation.verify();
              assert.equal(error.message, 'Error caught');
            });
          });
        });
      });
    });

    describe('Should return the user and the created token', () => {
      it('If all involked methods works properly', async () => {
        const email = 'teste@teste.com';
        const password = '12345678';
        const user = new User(email, password);

        const readUserByEmailExpectation = sinon
          .mock(userDAL)
          .expects('readUserByEmail')
          .withArgs(user)
          .resolves([{ id: 94, password: 'encryptedPassword' }]);

        const compareSyncExpectation = sinon
          .mock(bcrypt)
          .expects('compareSync')
          .withArgs(password, 'encryptedPassword')
          .returns(true);

        const generateUniqIdExpectation = sinon
          .mock(utils)
          .expects('generateUniqId')
          .withArgs(94)
          .returns('token');

        const createUserHasTokenExpectation = sinon
          .mock(loginDAL)
          .expects('createUserHasToken')
          // It does not test createUserHasTokenExpectation Args
          .resolves();

        await loginController.logon(email, password).then((result) => {
          // @ts-ignore
          readUserByEmailExpectation.verify();
          // @ts-ignore
          compareSyncExpectation.verify();
          // @ts-ignore
          generateUniqIdExpectation.verify();
          // @ts-ignore
          createUserHasTokenExpectation.verify();
          assert.deepEqual(result, {
            id: 94,
            email: user.getEmail(),
            password: 'Password is hidden',
            token: 'token'
          });
        });
      });
    });
  });

  describe('When involking logout', () => {
    describe('Should reject', () => {
      describe('If token is not a string', () => {
        it('Is a number', async () => {
          await loginController
            // @ts-ignore
            .logout(94, 94)
            .catch((error) => {
              assert.equal(error.message, '"token" must be a string');
            });
        });

        it('Is a boolean', async () => {
          await loginController
            // @ts-ignore
            .logout(true, 94)
            .catch((error) => {
              assert.equal(error.message, '"token" must be a string');
            });
        });

        it('Is a array', async () => {
          await loginController
            // @ts-ignore
            .logout([], 94)
            .catch((error) => {
              assert.equal(error.message, '"token" must be a string');
            });
        });

        it('Is a object', async () => {
          await loginController
            // @ts-ignore
            .logout({}, 94)
            .catch((error) => {
              assert.equal(error.message, '"token" must be a string');
            });
        });

        it('Is empty', async () => {
          await loginController
            // @ts-ignore
            .logout('', 94)
            .catch((error) => {
              assert.equal(error.message, '"token" is not allowed to be empty');
            });
        });

        it('Is undefined', async () => {
          await loginController
            // @ts-ignore
            .logout(undefined, 94)
            .catch((error) => {
              assert.equal(error.message, '"token" is required');
            });
        });
      });

      describe('If id is not a number', () => {
        it('Is a string', async () => {
          await loginController
            // @ts-ignore
            .logout('token', 'string')
            .catch((error) => {
              assert.equal(error.message, '"id" must be a number');
            });
        });

        it('Is a boolean', async () => {
          await loginController
            // @ts-ignore
            .logout('token', true)
            .catch((error) => {
              assert.equal(error.message, '"id" must be a number');
            });
        });

        it('Is a array', async () => {
          await loginController
            // @ts-ignore
            .logout('token', [])
            .catch((error) => {
              assert.equal(error.message, '"id" must be a number');
            });
        });

        it('Is a object', async () => {
          await loginController
            // @ts-ignore
            .logout('token', {})
            .catch((error) => {
              assert.equal(error.message, '"id" must be a number');
            });
        });

        it('Is undefined', async () => {
          await loginController
            // @ts-ignore
            .logout('token', undefined)
            .catch((error) => {
              assert.equal(error.message, '"id" is required');
            });
        });
      });

      describe('When involking userDAL.updateIsConnectedUserHasTokenByTokenAndId', () => {
        describe('With the given parameters', () => {
          it('And it rejects', async () => {
            const token = 'token';
            const id = 94;

            const updateIsConnectedUserHasTokenByTokenAndIdExpectation = sinon
              .mock(loginDAL)
              .expects('updateIsConnectedUserHasTokenByTokenAndId')
              .withArgs(token, id)
              .rejects(new Error('Error caught'));

            await loginController.logout(token, id).catch((error) => {
              // @ts-ignore
              updateIsConnectedUserHasTokenByTokenAndIdExpectation.verify();
              assert.equal(error.message, 'Error caught');
            });
          });
        });
      });
    });

    describe('Should return the user and the created token', () => {
      describe('Then all involked methods works properly', () => {
        it('And updateIsConnectedUserHasTokenByTokenAndId changes database', async () => {
          const token = 'token';
          const id = 94;

          const updateIsConnectedUserHasTokenByTokenAndIdExpectation = sinon
            .mock(loginDAL)
            .expects('updateIsConnectedUserHasTokenByTokenAndId')
            .withArgs(token, id)
            .resolves({ changedRows: 1 });

          await loginController.logout(token, id).then((result) => {
            // @ts-ignore
            updateIsConnectedUserHasTokenByTokenAndIdExpectation.verify();
            assert.deepEqual(result, {
              id: id,
              token: token,
              message: 'Disconnected'
            });
          });
        });

        it('And updateIsConnectedUserHasTokenByTokenAndId does not changes database', async () => {
          const token = 'token';
          const id = 94;

          const updateIsConnectedUserHasTokenByTokenAndIdExpectation = sinon
            .mock(loginDAL)
            .expects('updateIsConnectedUserHasTokenByTokenAndId')
            .withArgs(token, id)
            .resolves({ changedRows: 0 });

          await loginController.logout(token, id).then((result) => {
            // @ts-ignore
            updateIsConnectedUserHasTokenByTokenAndIdExpectation.verify();
            assert.deepEqual(result, {
              id: id,
              token: token,
              message: 'The token no longer exists'
            });
          });
        });
      });
    });
  });
});
