import bodyParser from 'body-parser';
import express from 'express';
import loginExpressRouter from './loginAPI';
import * as loginController from './loginController';
import request from 'supertest';
import sinon from 'sinon';
import { assert } from 'chai';
import * as loginErrors from './loginErrors';

const app = express();
app.use(bodyParser.json());
app.use('/login', loginExpressRouter);

describe('Unit test login/loginAPI', () => {
  afterEach(() => {
    sinon.restore();
  });

  describe('When send POST request to /login/logon', () => {
    describe('Should return status code 200 and loginController.logon result', () => {
      it('If works properly', async () => {
        const email = 'teste@teste.com';
        const password = '12345678';

        const logonExpectation = sinon
          .mock(loginController)
          .expects('logon')
          .withArgs(email, password)
          .resolves({ message: 'Result' });

        await request(app)
          .post('/login/logon')
          .send({
            email: email,
            password: password
          })
          .expect(200)
          .then((result) => {
            // @ts-ignore
            logonExpectation.verify();
            assert.deepEqual(result.body, { data: { message: 'Result' } });
          });
      });
    });

    describe('Should return status code and message handled by errorHandler', () => {
      it('If loginController.logon has an error', async () => {
        const email = 'teste@teste.com';
        const password = '12345678';
        const error = new Error('Error test');

        const logonExpectation = sinon
          .mock(loginController)
          .expects('logon')
          .withArgs(email, password)
          .rejects(error);

        const errorHandlerExpectation = sinon
          .mock(loginErrors)
          .expects('errorHandler')
          .withArgs(error)
          .returns({ statusCode: 500, message: 'Error caught' });

        await request(app)
          .post('/login/logon')
          .send({
            email: email,
            password: password
          })
          .expect(500)
          .then((result) => {
            // @ts-ignore
            logonExpectation.verify();
            // @ts-ignore
            errorHandlerExpectation.verify();
            assert.deepEqual(
              // @ts-ignore
              result.error.text,
              JSON.stringify({
                error: 'Error caught'
              })
            );
          });
      });
    });
  });

  describe('When send POST request to /login/logout/94', () => {
    describe('Should return status code 200 and loginController.logout result', () => {
      it('If works properly', async () => {
        const token = 'token';

        const logoutExpectation = sinon
          .mock(loginController)
          .expects('logout')
          .withArgs(token)
          .resolves({ message: 'Result' });

        await request(app)
          .post('/login/logout/94')
          .send({
            token: token
          })
          .expect(200)
          .then((result) => {
            // @ts-ignore
            logoutExpectation.verify();
            assert.deepEqual(result.body, { data: { message: 'Result' } });
          });
      });
    });

    describe('Should return status code and message handled by errorHandler', () => {
      it('If loginController.logout has an error', async () => {
        const token = 'token';
        const error = new Error('Error test');

        const logoutExpectation = sinon
          .mock(loginController)
          .expects('logout')
          .withArgs(token)
          .rejects(error);

        const errorHandlerExpectation = sinon
          .mock(loginErrors)
          .expects('errorHandler')
          .withArgs(error)
          .returns({ statusCode: 500, message: 'Error caught' });

        await request(app)
          .post('/login/logout/94')
          .send({
            token: token
          })
          .expect(500)
          .then((result) => {
            // @ts-ignore
            logoutExpectation.verify();
            // @ts-ignore
            errorHandlerExpectation.verify();
            assert.deepEqual(
              // @ts-ignore
              result.error.text,
              JSON.stringify({
                error: 'Error caught'
              })
            );
          });
      });
    });
  });
});
