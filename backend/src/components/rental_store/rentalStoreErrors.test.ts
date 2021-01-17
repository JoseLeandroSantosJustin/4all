import { ValidationError } from 'joi';
import { RentalStoreError, errorHandler } from './rentalStoreErrors';
import { assert } from 'chai';
import sinon from 'sinon';
import { logger } from './utils';

describe('Unit test rental_store/RentalStoreErrors', () => {
  afterEach(() => {
    sinon.restore();
  });

  describe('When invokilng errorHandler', () => {
    describe('Should return the given error message and status code 400', () => {
      it('If the given error is intance of joi.ValidationError', () => {
        const joiValidationError = new ValidationError(
          'Test joi validation',
          'test',
          'error'
        );
        const errorHandled = errorHandler(joiValidationError);

        assert.deepEqual(
          errorHandled,
          new RentalStoreError('Test joi validation', 400)
        );
      });

      it('If the given error has sqlState property', () => {
        interface MySQLError {
          sqlMessage: string;
          sqlState: string;
        }

        const error: MySQLError = {
          sqlMessage: 'Test 23000 MySQL error',
          sqlState: '23000'
        };

        // @ts-ignore
        const errorHandled = errorHandler(error);

        assert.deepEqual(
          errorHandled,
          new RentalStoreError('Test 23000 MySQL error', 400)
        );
      });
    });

    describe('Should log sqlMessage and stack', () => {
      describe('Then return the handled message and status code 500', () => {
        it('If the given error has sqlState property setted as 42000', () => {
          interface MySQLError {
            sqlMessage: string;
            sqlState: string;
            stack: string;
          }

          const error: MySQLError = {
            sqlMessage: 'Test 42000 MySQL error',
            sqlState: '42000',
            stack: 'Stack'
          };
          const errorExpectation = sinon
            .mock(logger)
            .expects('error')
            .withArgs({ message: 'Test 42000 MySQL error', stack: 'Stack' });

          // @ts-ignore
          const errorHandled = errorHandler(error);

          errorExpectation.verify();
          assert.deepEqual(
            errorHandled,
            new RentalStoreError('Could not connect to the database', 500)
          );
        });

        it('If the given error has sqlState property setted as 28000', () => {
          interface MySQLError {
            sqlMessage: string;
            sqlState: string;
            stack: string;
          }

          const error: MySQLError = {
            sqlMessage: 'Test 28000 MySQL error',
            sqlState: '28000',
            stack: 'Stack'
          };
          const errorExpectation = sinon
            .mock(logger)
            .expects('error')
            .withArgs({ message: 'Test 28000 MySQL error', stack: 'Stack' });

          // @ts-ignore
          const errorHandled = errorHandler(error);

          errorExpectation.verify();
          assert.deepEqual(
            errorHandled,
            new RentalStoreError('Could not connect to the database', 500)
          );
        });
      });

      describe('Then return a generic message and status code 500', () => {
        it('If the given error has sqlState property unhandled', () => {
          interface MySQLError {
            sqlMessage: string;
            sqlState: string;
            stack: string;
          }

          const error: MySQLError = {
            sqlMessage: 'Test 60000 MySQL error',
            sqlState: '60000',
            stack: 'Stack'
          };
          const errorExpectation = sinon
            .mock(logger)
            .expects('error')
            .withArgs({ message: 'Test 60000 MySQL error', stack: 'Stack' });

          // @ts-ignore
          const errorHandled = errorHandler(error);

          errorExpectation.verify();
          assert.deepEqual(
            errorHandled,
            new RentalStoreError('Unknown database error', 500)
          );
        });

        it('If the given error has sqlState property unhandled', () => {
          const error = { message: 'Any unknown error', stack: 'Stack' };
          const errorExpectation = sinon
            .mock(logger)
            .expects('error')
            .withArgs({ message: 'Any unknown error', stack: 'Stack' });

          // @ts-ignore
          const errorHandled = errorHandler(error);

          errorExpectation.verify();
          assert.deepEqual(
            errorHandled,
            new RentalStoreError('Unknown system error', 500)
          );
        });
      });
    });
  });
});
