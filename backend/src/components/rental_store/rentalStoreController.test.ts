import * as rentalStoreController from './rentalStoreController';
import { assert } from 'chai';
import sinon from 'sinon';
import * as rentalStoreDAL from './rentalStoreDAL';
import Media from './Media';

describe('Unit test rental_store/rentalStoreController', () => {
  afterEach(() => {
    sinon.restore();
  });

  describe('When involking readRentalStoreMoviesByIsRentedState', () => {
    describe('Should reject', () => {
      describe('If id is not a number', () => {
        it('Is a string', async () => {
          await rentalStoreController
            // @ts-ignore
            .readRentalStoreMoviesByIsRentedState('94', true)
            .catch((error) => {
              assert.equal(error.message, '"id" must be a number');
            });
        });

        it('Is a boolean', async () => {
          await rentalStoreController
            // @ts-ignore
            .readRentalStoreMoviesByIsRentedState(true, true)
            .catch((error) => {
              assert.equal(error.message, '"id" must be a number');
            });
        });

        it('Is a array', async () => {
          await rentalStoreController
            // @ts-ignore
            .readRentalStoreMoviesByIsRentedState([], true)
            .catch((error) => {
              assert.equal(error.message, '"id" must be a number');
            });
        });

        it('Is a object', async () => {
          await rentalStoreController
            // @ts-ignore
            .readRentalStoreMoviesByIsRentedState({}, true)
            .catch((error) => {
              assert.equal(error.message, '"id" must be a number');
            });
        });

        it('Is empty', async () => {
          await rentalStoreController
            // @ts-ignore
            .readRentalStoreMoviesByIsRentedState(0, true)
            .catch((error) => {
              assert.equal(error.message, '"id" is not allowed to be empty');
            });
        });

        it('Is undefined', async () => {
          await rentalStoreController
            // @ts-ignore
            .readRentalStoreMoviesByIsRentedState(undefined, true)
            .catch((error) => {
              assert.equal(error.message, '"id" is required');
            });
        });
      });

      describe('If isRented is not a boolean', () => {
        it('Is a string', async () => {
          await rentalStoreController
            // @ts-ignore
            .readRentalStoreMoviesByIsRentedState(94, 'true')
            .catch((error) => {
              assert.equal(error.message, '"isRented" must be a boolean');
            });
        });

        it('Is a number', async () => {
          await rentalStoreController
            // @ts-ignore
            .readRentalStoreMoviesByIsRentedState(94, 94)
            .catch((error) => {
              assert.equal(error.message, '"isRented" must be a boolean');
            });
        });

        it('Is a array', async () => {
          await rentalStoreController
            // @ts-ignore
            .readRentalStoreMoviesByIsRentedState(94, [])
            .catch((error) => {
              assert.equal(error.message, '"isRented" must be a boolean');
            });
        });

        it('Is a object', async () => {
          await rentalStoreController
            // @ts-ignore
            .readRentalStoreMoviesByIsRentedState(94, {})
            .catch((error) => {
              assert.equal(error.message, '"isRented" must be a boolean');
            });
        });

        it('Is empty', async () => {
          await rentalStoreController
            // @ts-ignore
            .readRentalStoreMoviesByIsRentedState(94, false)
            .catch((error) => {
              assert.equal(
                error.message,
                '"isRented" is not allowed to be empty'
              );
            });
        });

        it('Is undefined', async () => {
          await rentalStoreController
            // @ts-ignore
            .readRentalStoreMoviesByIsRentedState(94, undefined)
            .catch((error) => {
              assert.equal(error.message, '"isRented" is required');
            });
        });
      });

      describe('When involking rentalStoreDAL.readRentalStoreMoviesByIsRentedState', () => {
        describe('With the given parameters', () => {
          it('And it rejects', async () => {
            const id = 94;
            const isRented = true;

            const readRentalStoreMoviesByIsRentedStateExpectation = sinon
              .mock(rentalStoreDAL)
              .expects('readRentalStoreMoviesByIsRentedState')
              .withArgs(id, isRented)
              .rejects(new Error('Error caught'));

            await rentalStoreController
              .readRentalStoreMoviesByIsRentedState(id, isRented)
              .catch((error) => {
                // @ts-ignore
                readRentalStoreMoviesByIsRentedStateExpectation.verify();
                assert.equal(error.message, 'Error caught');
              });
          });
        });
      });
    });

    describe('Should invoke rentalStoreDAL.readRentalStoreMoviesByIsRentedState', () => {
      describe('With the given parameters', () => {
        describe('Then return the all available movies', () => {
          it('If works properly', async () => {
            const id = 94;
            const title = 'Teste';
            const director = 'Teste';
            const isRented = true;

            const readRentalStoreMoviesByIsRentedStateExpectation = sinon
              .mock(rentalStoreDAL)
              .expects('readRentalStoreMoviesByIsRentedState')
              .withArgs(id, isRented)
              .resolves([
                { id: id, title: title, name: director, is_rented: isRented }
              ]);

            await rentalStoreController
              .readRentalStoreMoviesByIsRentedState(id, isRented)
              .then((result) => {
                // @ts-ignore
                readRentalStoreMoviesByIsRentedStateExpectation.verify();
                assert.deepEqual(result, [
                  new Media(id, title, director, isRented)
                ]);
              });
          });
        });
      });
    });
  });

  describe('When involking readRentalStoreMoviesByMovieTitle', () => {
    describe('Should reject', () => {
      describe('If id is not a number', () => {
        it('Is a string', async () => {
          await rentalStoreController
            // @ts-ignore
            .readRentalStoreMoviesByMovieTitle('94', 'Teste')
            .catch((error) => {
              assert.equal(error.message, '"id" must be a number');
            });
        });

        it('Is a boolean', async () => {
          await rentalStoreController
            // @ts-ignore
            .readRentalStoreMoviesByMovieTitle(true, 'Teste')
            .catch((error) => {
              assert.equal(error.message, '"id" must be a number');
            });
        });

        it('Is a array', async () => {
          await rentalStoreController
            // @ts-ignore
            .readRentalStoreMoviesByMovieTitle([], 'Teste')
            .catch((error) => {
              assert.equal(error.message, '"id" must be a number');
            });
        });

        it('Is a object', async () => {
          await rentalStoreController
            // @ts-ignore
            .readRentalStoreMoviesByMovieTitle({}, 'Teste')
            .catch((error) => {
              assert.equal(error.message, '"id" must be a number');
            });
        });

        it('Is empty', async () => {
          await rentalStoreController
            // @ts-ignore
            .readRentalStoreMoviesByMovieTitle(0, 'Teste')
            .catch((error) => {
              assert.equal(error.message, '"id" is not allowed to be empty');
            });
        });

        it('Is undefined', async () => {
          await rentalStoreController
            // @ts-ignore
            .readRentalStoreMoviesByMovieTitle(undefined, 'Teste')
            .catch((error) => {
              assert.equal(error.message, '"id" is required');
            });
        });
      });

      describe('If title is not a string', () => {
        it('Is a number', async () => {
          await rentalStoreController
            // @ts-ignore
            .readRentalStoreMoviesByMovieTitle(94, 9494)
            .catch((error) => {
              assert.equal(error.message, '"title" must be a string');
            });
        });

        it('Is a boolean', async () => {
          await rentalStoreController
            // @ts-ignore
            .readRentalStoreMoviesByMovieTitle(94, true)
            .catch((error) => {
              assert.equal(error.message, '"title" must be a string');
            });
        });

        it('Is a array', async () => {
          await rentalStoreController
            // @ts-ignore
            .readRentalStoreMoviesByMovieTitle(94, [])
            .catch((error) => {
              assert.equal(error.message, '"title" must be a string');
            });
        });

        it('Is a object', async () => {
          await rentalStoreController
            // @ts-ignore
            .readRentalStoreMoviesByMovieTitle(94, {})
            .catch((error) => {
              assert.equal(error.message, '"title" must be a string');
            });
        });

        it('Is empty', async () => {
          await rentalStoreController
            // @ts-ignore
            .readRentalStoreMoviesByMovieTitle(94, '')
            .catch((error) => {
              assert.equal(error.message, '"title" is not allowed to be empty');
            });
        });

        it('Is undefined', async () => {
          await rentalStoreController
            // @ts-ignore
            .readRentalStoreMoviesByMovieTitle(94, undefined)
            .catch((error) => {
              assert.equal(error.message, '"title" is required');
            });
        });
      });

      describe('When involking rentalStoreDAL.readRentalStoreMoviesByMovieTitle', () => {
        describe('With the given parameters', () => {
          it('And it rejects', async () => {
            const id = 94;
            const title = 'Teste';

            const readRentalStoreMoviesByMovieTitleExpectation = sinon
              .mock(rentalStoreDAL)
              .expects('readRentalStoreMoviesByMovieTitle')
              .withArgs(id, title)
              .rejects(new Error('Error caught'));

            await rentalStoreController
              .readRentalStoreMoviesByMovieTitle(id, title)
              .catch((error) => {
                // @ts-ignore
                readRentalStoreMoviesByMovieTitleExpectation.verify();
                assert.equal(error.message, 'Error caught');
              });
          });
        });
      });
    });

    describe('Should invoke rentalStoreDAL.readRentalStoreMoviesByMovieTitle', () => {
      describe('With the given parameters', () => {
        describe('Then return the all movies that title matches', () => {
          it('If works properly', async () => {
            const id = 94;
            const title = 'Teste';
            const director = 'Teste';
            const isRented = true;

            const readRentalStoreMoviesByMovieTitleExpectation = sinon
              .mock(rentalStoreDAL)
              .expects('readRentalStoreMoviesByMovieTitle')
              .withArgs(id)
              .resolves([
                { id: id, title: title, name: director, is_rented: isRented }
              ]);

            await rentalStoreController
              .readRentalStoreMoviesByMovieTitle(id, title)
              .then((result) => {
                // @ts-ignore
                readRentalStoreMoviesByMovieTitleExpectation.verify();
                assert.deepEqual(result, [
                  new Media(id, title, director, isRented)
                ]);
              });
          });
        });
      });
    });
  });

  describe('When involking updateMediaById', () => {
    describe('Should reject', () => {
      describe('If id is not a number', () => {
        it('Is a string', async () => {
          await rentalStoreController
            // @ts-ignore
            .updateMediaById('94', true)
            .catch((error) => {
              assert.equal(error.message, '"id" must be a number');
            });
        });

        it('Is a boolean', async () => {
          await rentalStoreController
            // @ts-ignore
            .updateMediaById(true, true)
            .catch((error) => {
              assert.equal(error.message, '"id" must be a number');
            });
        });

        it('Is a array', async () => {
          await rentalStoreController
            // @ts-ignore
            .updateMediaById([], true)
            .catch((error) => {
              assert.equal(error.message, '"id" must be a number');
            });
        });

        it('Is a object', async () => {
          await rentalStoreController
            // @ts-ignore
            .updateMediaById({}, true)
            .catch((error) => {
              assert.equal(error.message, '"id" must be a number');
            });
        });

        it('Is empty', async () => {
          await rentalStoreController
            // @ts-ignore
            .updateMediaById(0, true)
            .catch((error) => {
              assert.equal(error.message, '"id" is not allowed to be empty');
            });
        });

        it('Is undefined', async () => {
          await rentalStoreController
            // @ts-ignore
            .updateMediaById(undefined, true)
            .catch((error) => {
              assert.equal(error.message, '"id" is required');
            });
        });
      });

      describe('If isRented is not a boolean', () => {
        it('Is a string', async () => {
          await rentalStoreController
            // @ts-ignore
            .updateMediaById(94, 'true')
            .catch((error) => {
              assert.equal(error.message, '"isRented" must be a boolean');
            });
        });

        it('Is a number', async () => {
          await rentalStoreController
            // @ts-ignore
            .updateMediaById(94, 94)
            .catch((error) => {
              assert.equal(error.message, '"isRented" must be a boolean');
            });
        });

        it('Is a array', async () => {
          await rentalStoreController
            // @ts-ignore
            .updateMediaById(94, [])
            .catch((error) => {
              assert.equal(error.message, '"isRented" must be a boolean');
            });
        });

        it('Is a object', async () => {
          await rentalStoreController
            // @ts-ignore
            .updateMediaById(94, {})
            .catch((error) => {
              assert.equal(error.message, '"isRented" must be a boolean');
            });
        });

        it('Is empty', async () => {
          await rentalStoreController
            // @ts-ignore
            .updateMediaById(94, false)
            .catch((error) => {
              assert.equal(
                error.message,
                '"isRented" is not allowed to be empty'
              );
            });
        });

        it('Is undefined', async () => {
          await rentalStoreController
            // @ts-ignore
            .updateMediaById(94, undefined)
            .catch((error) => {
              assert.equal(error.message, '"isRented" is required');
            });
        });
      });

      describe('When involking rentalStoreDAL.updateMediaById', () => {
        describe('With the given parameters', () => {
          it('And it rejects', async () => {
            const id = 94;
            const isRented = true;

            const updateMediaByIdExpectation = sinon
              .mock(rentalStoreDAL)
              .expects('updateMediaById')
              .withArgs(id, isRented)
              .rejects(new Error('Error caught'));

            await rentalStoreController
              .updateMediaById(id, isRented)
              .catch((error) => {
                // @ts-ignore
                updateMediaByIdExpectation.verify();
                assert.equal(error.message, 'Error caught');
              });
          });
        });
      });
    });

    describe('Should invoke rentalStoreDAL.updateMediaById', () => {
      describe('With the user given parameters', () => {
        describe('Then return the updateMediaById result', () => {
          it('If works properly and updateMediaById change at least one row', async () => {
            const id = 94;
            const isRented = true;

            const updateMediaByIdExpectation = sinon
              .mock(rentalStoreDAL)
              .expects('updateMediaById')
              .withArgs(id, isRented)
              .resolves({ changedRows: 1 });

            await rentalStoreController
              .updateMediaById(id, isRented)
              .then((result) => {
                // @ts-ignore
                updateMediaByIdExpectation.verify();
                assert.deepEqual(result, {
                  id: id,
                  isRented: isRented,
                  message: 'Media updated'
                });
              });
          });

          it('If works properly and updateMediaById does not change any row', async () => {
            const id = 94;
            const isRented = true;

            const updateMediaByIdExpectation = sinon
              .mock(rentalStoreDAL)
              .expects('updateMediaById')
              .withArgs(id, isRented)
              .resolves({ changedRows: 0 });

            await rentalStoreController
              .updateMediaById(id, isRented)
              .then((result) => {
                // @ts-ignore
                updateMediaByIdExpectation.verify();
                assert.deepEqual(result, {
                  id: id,
                  isRented: isRented,
                  message: `The isRented of the Media state is already ${isRented}`
                });
              });
          });
        });
      });
    });
  });
});
