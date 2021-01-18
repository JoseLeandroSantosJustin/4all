import bodyParser from 'body-parser';
import express from 'express';
import userExpressRouter from './userAPI';
import request from 'supertest';
import sinon from 'sinon';
import * as userController from './userController';
import { assert } from 'chai';
import * as userErrors from './userErrors';
import User from './User';

const app = express();
app.use(bodyParser.json());
app.use('/users', userExpressRouter);

describe('Unit test user/userAPI', () => {
  afterEach(() => {
    sinon.restore();
  });

  describe('When send GET request', () => {
    describe('Should involke userController.readAllUsers', () => {
      describe('Then return status code 200', () => {
        it('If userController.readAllUsers find at least one user', async () => {
          const readAllUsersExpectation = sinon
            .mock(userController)
            .expects('readAllUsers')
            .resolves(['user']);

          await request(app)
            .get('/users')
            .expect(200)
            .then((result) => {
              // @ts-ignore
              readAllUsersExpectation.verify();
              assert.deepEqual(result.body, {
                data: ['user']
              });
            });
        });
      });

      describe('Then return status code 204', () => {
        it('If userController.readAllUsers find no user', async () => {
          const readAllUsersExpectation = sinon
            .mock(userController)
            .expects('readAllUsers')
            .resolves([]);

          await request(app)
            .get('/users')
            .expect(204)
            .then((result) => {
              // @ts-ignore
              readAllUsersExpectation.verify();
              assert.deepEqual(result.body, {});
            });
        });
      });

      describe('Then return the handled status code and message', () => {
        it('If userController.readAllUsers throws an error', async () => {
          const error = new Error('Error caught');
          const readAllUsersExpectation = sinon
            .mock(userController)
            .expects('readAllUsers')
            .rejects(error);

          const errorHandlerExpectation = sinon
            .mock(userErrors)
            .expects('errorHandler')
            .withArgs(error)
            .returns({ message: 'message', statusCode: 500 });

          await request(app)
            .get('/users')
            .expect(500)
            .then((result) => {
              // @ts-ignore
              readAllUsersExpectation.verify();
              // @ts-ignore
              errorHandlerExpectation.verify();
              assert.equal(
                // @ts-ignore
                result.error.text,
                JSON.stringify({
                  error: 'message'
                })
              );
            });
        });
      });
    });
  });

  describe('When send POST request', () => {
    describe('Should involke userController.createUser', () => {
      describe('Then return status code 201', () => {
        it('If userController.createUser creates the user', async () => {
          const email = 'teste@teste.com';
          const password = '12345678';
          const name = 'Teste';
          const user = new User(name, email, password, 94);

          const createUserExpectation = sinon
            .mock(userController)
            .expects('createUser')
            .resolves(user);

          await request(app)
            .post('/users')
            .send({
              email: email,
              password: password,
              name: name
            })
            .expect(201)
            .then((result) => {
              // @ts-ignore
              createUserExpectation.verify();
              assert.deepEqual(result.body, {
                data: user
              });
            });
        });
      });

      describe('Then return the handled status code and message', () => {
        it('If userController.createUser throws an error', async () => {
          const email = 'teste@teste.com';
          const password = '12345678';
          const name = 'Teste';
          const error = new Error('Error caught');

          const createUserExpectation = sinon
            .mock(userController)
            .expects('createUser')
            .rejects(error);

          const errorHandlerExpectation = sinon
            .mock(userErrors)
            .expects('errorHandler')
            .withArgs(error)
            .returns({ message: 'message', statusCode: 500 });

          await request(app)
            .post('/users')
            .send({
              email: email,
              password: password,
              name: name
            })
            .expect(500)
            .then((result) => {
              // @ts-ignore
              createUserExpectation.verify();
              // @ts-ignore
              errorHandlerExpectation.verify();
              assert.equal(
                // @ts-ignore
                result.error.text,
                JSON.stringify({
                  error: 'message'
                })
              );
            });
        });
      });
    });
  });
});
