import * as userController from './userController';
import { assert } from 'chai';
import sinon from 'sinon';
import * as userDAL from './userDAL';
import User from './User';

describe('Unit test user/userController', () => {
  beforeEach(() => {
    sinon.restore();
  });

  describe('When involking createUser', () => {
    describe('Should reject', () => {
      describe('If email is not a string', () => {
        it('Is a number', async () => {
          await userController
            // @ts-ignore
            .createUser(12, '12345678', 'Test')
            .catch((error) => {
              assert.equal(error.message, '"email" must be a string');
            });
        });

        it('Is a boolean', async () => {
          await userController
            // @ts-ignore
            .createUser(true, '12345678', 'Test')
            .catch((error) => {
              assert.equal(error.message, '"email" must be a string');
            });
        });

        it('Is a array', async () => {
          await userController
            // @ts-ignore
            .createUser([], '12345678', 'Test')
            .catch((error) => {
              assert.equal(error.message, '"email" must be a string');
            });
        });

        it('Is a object', async () => {
          await userController
            // @ts-ignore
            .createUser({}, '12345678', 'Test')
            .catch((error) => {
              assert.equal(error.message, '"email" must be a string');
            });
        });

        it('Is empty', async () => {
          await userController
            .createUser('', '12345678', 'Test')
            .catch((error) => {
              assert.equal(error.message, '"email" is not allowed to be empty');
            });
        });

        it('Is undefined', async () => {
          await userController
            // @ts-ignore
            .createUser(undefined, '12345678', 'Test')
            .catch((error) => {
              assert.equal(error.message, '"email" is required');
            });
        });
      });

      describe('If password is not a string', () => {
        it('Is a number', async () => {
          await userController
            // @ts-ignore
            .createUser('teste@teste.com', 12, 'Test')
            .catch((error) => {
              assert.equal(error.message, '"password" must be a string');
            });
        });

        it('Is a boolean', async () => {
          await userController
            // @ts-ignore
            .createUser('teste@teste.com', true, 'Test')
            .catch((error) => {
              assert.equal(error.message, '"password" must be a string');
            });
        });

        it('Is a array', async () => {
          await userController
            // @ts-ignore
            .createUser('teste@teste.com', [], 'Test')
            .catch((error) => {
              assert.equal(error.message, '"password" must be a string');
            });
        });

        it('Is a object', async () => {
          await userController
            // @ts-ignore
            .createUser('teste@teste.com', {}, 'Test')
            .catch((error) => {
              assert.equal(error.message, '"password" must be a string');
            });
        });

        it('Is empty', async () => {
          // @ts-ignore
          await userController
            .createUser('teste@teste.com', '', 'Test')
            .catch((error) => {
              assert.equal(
                error.message,
                '"password" is not allowed to be empty'
              );
            });
        });

        it('Is undefined', async () => {
          await userController
            // @ts-ignore
            .createUser('teste@teste.com', undefined, 'Test')
            .catch((error) => {
              assert.equal(error.message, '"password" is required');
            });
        });
      });

      describe('If name is not a string', () => {
        it('Is a number', async () => {
          await userController
            // @ts-ignore
            .createUser('teste@teste.com', '12345678', 12)
            .catch((error) => {
              assert.equal(error.message, '"name" must be a string');
            });
        });

        it('Is a boolean', async () => {
          await userController
            // @ts-ignore
            .createUser('teste@teste.com', '12345678', true)
            .catch((error) => {
              assert.equal(error.message, '"name" must be a string');
            });
        });

        it('Is a array', async () => {
          await userController
            // @ts-ignore
            .createUser('teste@teste.com', '12345678', [])
            .catch((error) => {
              assert.equal(error.message, '"name" must be a string');
            });
        });

        it('Is a object', async () => {
          await userController
            // @ts-ignore
            .createUser('teste@teste.com', '12345678', {})
            .catch((error) => {
              assert.equal(error.message, '"name" must be a string');
            });
        });

        it('Is empty', async () => {
          // @ts-ignore
          await userController
            .createUser('teste@teste.com', '12345678', '')
            .catch((error) => {
              assert.equal(error.message, '"name" is not allowed to be empty');
            });
        });

        it('Is undefined', async () => {
          await userController
            // @ts-ignore
            .createUser('teste@teste.com', '12345678', undefined)
            .catch((error) => {
              assert.equal(error.message, '"name" is required');
            });
        });
      });
    });

    describe('Should invoke userDAL.createUser', () => {
      describe('With the user given parameters', () => {
        describe('Then return the created user', () => {
          it('If works properly', async () => {
            const email = 'teste@teste.com';
            const password = '12345678';
            const name = 'Teste';
            const user = new User(name, email, password);

            const userDALCreateUserExpectation = sinon
              .mock(userDAL)
              .expects('createUser')
              .withArgs(user)
              .resolves({ insertId: 94 });

            await userController
              .createUser(email, password, name)
              .then((result) => {
                // @ts-ignore
                userDALCreateUserExpectation.verify();
                user.setId(94);
                assert.deepEqual(result, user);
              });
          });

          it('If createUser throws an error', async () => {
            const email = 'teste@teste.com';
            const password = '12345678';
            const name = 'Teste';
            const user = new User(name, email, password);

            const userDALCreateUserExpectation = sinon
              .mock(userDAL)
              .expects('createUser')
              .withArgs(user)
              .rejects('Error caught');

            await userController
              .createUser(email, password, name)
              .catch((error) => {
                // @ts-ignore
                userDALCreateUserExpectation.verify();
                assert.equal(error, 'Error caught');
              });
          });
        });
      });
    });
  });

  describe('When involking readAllUsers', () => {
    describe('Should invoke userDAL.readAllUsers', () => {
      describe('Then return an array with all users', () => {
        it('If works properly', async () => {
          const name1 = 'Teste1';
          const email1 = 'teste1@teste.com';
          const id1 = 94;
          const name2 = 'Teste2';
          const email2 = 'teste2@teste.com';
          const id2 = 95;

          const userDALReadAllUsersExpectation = sinon
            .mock(userDAL)
            .expects('readAllUsers')
            .withArgs()
            .resolves([
              {
                name: name1,
                email: email1,
                id: id1
              },
              {
                name: name2,
                email: email2,
                id: id2
              }
            ]);

          await userController.readAllUsers().then((result) => {
            const user1 = new User(name1, email1, 'Password is hidden', id1);
            const user2 = new User(name2, email2, 'Password is hidden', id2);

            // @ts-ignore
            userDALReadAllUsersExpectation.verify();
            assert.deepEqual(result, [user1, user2]);
          });
        });

        it('If readAllUsers throws an error', async () => {
          const userDALReadAllUsersExpectation = sinon
            .mock(userDAL)
            .expects('readAllUsers')
            .withArgs()
            .rejects('Error caught');

          await userController.readAllUsers().catch((error) => {
            // @ts-ignore
            userDALReadAllUsersExpectation.verify();
            assert.equal(error, 'Error caught');
          });
        });
      });
    });
  });
});
