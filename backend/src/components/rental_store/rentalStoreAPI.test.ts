import bodyParser from 'body-parser';
import express from 'express';
import rentalStoreExpressRouter from './rentalStoreAPI';
import request from 'supertest';
import sinon from 'sinon';
import * as rentalStoreController from './rentalStoreController';
import { assert } from 'chai';
import * as rentalStoreErrors from './rentalStoreErrors';
// import User from './User';

const app = express();
app.use(bodyParser.json());
app.use('/rental-store', rentalStoreExpressRouter);

describe('Unit test rental_store/rentalStoreAPI', () => {
  afterEach(() => {
    sinon.restore();
  });

  describe('When send GET request to /:id/movies?', () => {
    describe("With query string 'title' setted", () => {
      describe('Should involke rentalStoreController.readRentalStoreMoviesByMovieTitle', () => {
        it('Then return status code 200', async () => {
          const readRentalStoreMoviesByMovieTitleExpectation = sinon
            .mock(rentalStoreController)
            .expects('readRentalStoreMoviesByMovieTitle')
            .withArgs('94', 'Test')
            .resolves([{}]);

          await request(app)
            .get('/rental-store/94/movies?title=Test')
            .expect(200)
            .then((result) => {
              // @ts-ignore
              readRentalStoreMoviesByMovieTitleExpectation.verify();
              assert.deepEqual(result.body, [{}]);
            });
        });

        describe('Then return the handled status code and message', () => {
          it('If rentalStoreController.readRentalStoreMoviesByMovieTitle throws an error', async () => {
            const error = new Error('Error caught');
            const readRentalStoreMoviesByMovieTitleExpectation = sinon
              .mock(rentalStoreController)
              .expects('readRentalStoreMoviesByMovieTitle')
              .withArgs('94', 'Test')
              .rejects(error);

            const errorHandlerExpectation = sinon
              .mock(rentalStoreErrors)
              .expects('errorHandler')
              .withArgs(error)
              .returns({ message: 'message', statusCode: 500 });

            await request(app)
              .get('/rental-store/94/movies?title=Test')
              .expect(500)
              .then((result) => {
                // @ts-ignore
                readRentalStoreMoviesByMovieTitleExpectation.verify();
                // @ts-ignore
                errorHandlerExpectation.verify();
                // @ts-ignore
                assert.equal(result.error.text, 'message');
              });
          });
        });
      });
    });

    describe("With query string 'isRented' setted or not", () => {
      describe('Should involke rentalStoreController.readRentalStoreMoviesByIsRentedState', () => {
        it('Then return status code 200', async () => {
          const readRentalStoreMoviesByIsRentedStateExpectation = sinon
            .mock(rentalStoreController)
            .expects('readRentalStoreMoviesByIsRentedState')
            .withArgs('94', false)
            .resolves([{}]);

          await request(app)
            .get('/rental-store/94/movies')
            .expect(200)
            .then((result) => {
              // @ts-ignore
              readRentalStoreMoviesByIsRentedStateExpectation.verify();
              assert.deepEqual(result.body, [{}]);
            });
        });

        it('Then return status code 200', async () => {
          const readRentalStoreMoviesByIsRentedStateExpectation = sinon
            .mock(rentalStoreController)
            .expects('readRentalStoreMoviesByIsRentedState')
            .withArgs('94', true)
            .resolves([{}]);

          await request(app)
            .get('/rental-store/94/movies?isRented=true')
            .expect(200)
            .then((result) => {
              // @ts-ignore
              readRentalStoreMoviesByIsRentedStateExpectation.verify();
              assert.deepEqual(result.body, [{}]);
            });
        });

        describe('Then return the handled status code and message', () => {
          it('If rentalStoreController.readRentalStoreMoviesByIsRentedState throws an error', async () => {
            const error = new Error('Error caught');
            const readRentalStoreMoviesByIsRentedStateExpectation = sinon
              .mock(rentalStoreController)
              .expects('readRentalStoreMoviesByIsRentedState')
              .withArgs('94', false)
              .rejects(error);

            const errorHandlerExpectation = sinon
              .mock(rentalStoreErrors)
              .expects('errorHandler')
              .withArgs(error)
              .returns({ message: 'message', statusCode: 500 });

            await request(app)
              .get('/rental-store/94/movies')
              .expect(500)
              .then((result) => {
                // @ts-ignore
                readRentalStoreMoviesByIsRentedStateExpectation.verify();
                // @ts-ignore
                errorHandlerExpectation.verify();
                // @ts-ignore
                assert.equal(result.error.text, 'message');
              });
          });
        });
      });
    });
  });

  describe('When send POST request', () => {
    describe('Should involke rentalStoreController.updateMediaById', () => {
      describe('Then return status code 200', () => {
        it('If rentalStoreController.updateMediaById updates the media', async () => {
          const isRented = true;

          const updateMediaByIdExpectation = sinon
            .mock(rentalStoreController)
            .expects('updateMediaById')
            .withArgs('94', isRented)
            .resolves({ message: 'Media updated' });

          await request(app)
            .post('/rental-store/94/media/94')
            .send({
              isRented: isRented
            })
            .expect(200)
            .then((result) => {
              // @ts-ignore
              updateMediaByIdExpectation.verify();
              assert.deepEqual(result.body, { message: 'Media updated' });
            });
        });
      });

      describe('Then return the handled status code and message', () => {
        it('If rentalStoreController.updateMediaById throws an error', async () => {
          const isRented = true;
          const error = new Error('Error caught');

          const updateMediaByIdExpectation = sinon
            .mock(rentalStoreController)
            .expects('updateMediaById')
            .withArgs('94', isRented)
            .rejects(error);

          const errorHandlerExpectation = sinon
            .mock(rentalStoreErrors)
            .expects('errorHandler')
            .withArgs(error)
            .returns({ message: 'message', statusCode: 500 });

          await request(app)
            .post('/rental-store/94/media/94')
            .send({
              isRented: isRented
            })
            .expect(500)
            .then((result) => {
              // @ts-ignore
              updateMediaByIdExpectation.verify();
              // @ts-ignore
              errorHandlerExpectation.verify();
              // @ts-ignore
              assert.equal(result.error.text, 'message');
            });
        });
      });
    });
  });
});
