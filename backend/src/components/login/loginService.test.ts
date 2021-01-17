import bodyParser from 'body-parser';
import express, { Router } from 'express';
import request from 'supertest';
import sinon from 'sinon';
import { assert } from 'chai';
import authenticationExpressRouter from './loginService';
import * as loginDAL from './loginDAL';
import { logger } from './utils';

const testRouter = Router();

testRouter.get('', (req, res) => {
  res.status(200).send({ message: 'It worked' }).end();
});

const app = express();
app.use(bodyParser.json());
app.use(authenticationExpressRouter);
app.use('/test', testRouter);

describe('Unit test login/loginService', () => {
  afterEach(() => {
    sinon.restore();
  });

  describe('When send GET request to /test', () => {
    describe('Should middleware', () => {
      describe('Fails authentication', () => {
        it('If loginDAL.readUserHasTokenByToken does not find user', async () => {
          const token = 'token';

          const readUserHasTokenByTokenExpectation = sinon
            .mock(loginDAL)
            .expects('readUserHasTokenByToken')
            .withArgs(token)
            .resolves([]);

          await request(app)
            .get('/test')
            .set({ Authorization: token })
            .expect(401)
            .then((result) => {
              // @ts-ignore
              readUserHasTokenByTokenExpectation.verify();
              assert.deepEqual(result.body, {
                error: 'Authentication failed, try again with another token'
              });
            });
        });

        it('If the found user has a token already discarded', async () => {
          const token = 'token';

          const readUserHasTokenByTokenExpectation = sinon
            .mock(loginDAL)
            .expects('readUserHasTokenByToken')
            .withArgs(token)
            .resolves([{ is_connected: 0 }]);

          await request(app)
            .get('/test')
            .set({ Authorization: token })
            .expect(401)
            .then((result) => {
              // @ts-ignore
              readUserHasTokenByTokenExpectation.verify();
              assert.deepEqual(result.body, {
                error: 'Authentication failed, try again with another token'
              });
            });
        });

        it('If the found user has a expired token ', async () => {
          const token = 'token';

          const readUserHasTokenByTokenExpectation = sinon
            .mock(loginDAL)
            .expects('readUserHasTokenByToken')
            .withArgs(token)
            .resolves([{ last_access_date: 1610000000000 }]);

          await request(app)
            .get('/test')
            .set({ Authorization: token })
            .expect(401)
            .then((result) => {
              // @ts-ignore
              readUserHasTokenByTokenExpectation.verify();
              assert.deepEqual(result.body, {
                error: 'Authentication failed, expired token'
              });
            });
        });

        it('If loginDAL.readUserHasTokenByToken does not find user', async () => {
          const token = 'token';
          const error = { message: 'Error caught', stack: 'Stack' };

          const readUserHasTokenByTokenExpectation = sinon
            .mock(loginDAL)
            .expects('readUserHasTokenByToken')
            .withArgs(token)
            .rejects(error);

          const errorExpectation = sinon
            .mock(logger)
            .expects('error')
            .withArgs({ message: 'Error caught', stack: 'Stack' });

          await request(app)
            .get('/test')
            .set({ Authorization: token })
            .expect(500)
            .then((result) => {
              // @ts-ignore
              readUserHasTokenByTokenExpectation.verify();
              // @ts-ignore
              errorExpectation.verify();
              assert.deepEqual(result.body, {
                error: 'Error while authenticating, try again later'
              });
            });
        });
      });
    });

    describe('Should call next', () => {
      it('If works properly', async () => {
        const token = 'token';

        const readUserHasTokenByTokenExpectation = sinon
          .mock(loginDAL)
          .expects('readUserHasTokenByToken')
          .withArgs(token)
          .resolves([{ last_access_date: new Date() }]);

        await request(app)
          .get('/test')
          .set({ Authorization: token })
          .expect(200)
          .then((result) => {
            // @ts-ignore
            readUserHasTokenByTokenExpectation.verify();
            assert.deepEqual(result.body, { message: 'It worked' });
          });
      });
    });
  });
});
