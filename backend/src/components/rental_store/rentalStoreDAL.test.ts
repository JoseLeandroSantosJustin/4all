import sinon from 'sinon';
import MySQL from './MySQL';
import {
  readRentalStoreMoviesByIsRentedState,
  readRentalStoreMoviesByMovieTitle,
  updateMediaById
} from './rentalStoreDAL';
import { assert } from 'chai';
import * as utils from './utils';

describe('Unit test rental_store/rentalStoreDAL', () => {
  beforeEach(() => {
    sinon.restore();
  });

  describe('When involking readRentalStoreMoviesByIsRentedState', () => {
    describe('Should involke startConnection, execQuery with select statement and closeConnection', () => {
      it('If there are no errors in the execQuery', async () => {
        const id = 94;

        // @ts-ignore
        sinon.stub(utils, 'startConnection').returns('connection');
        const mysqlMock = sinon.mock(MySQL);
        const execQueryExpectation = mysqlMock
          .expects('execQuery')
          .withArgs(
            'connection',
            'SELECT me.id, mo.title, md.name, me.is_rented FROM rental_store AS rs INNER JOIN rental_store_has_media AS rshm ON rshm.id_rental_store = rs.id INNER JOIN media AS me ON me.id = rshm.id_media INNER JOIN movie AS mo ON mo.id = me.id_movie  INNER JOIN movie_director AS md ON md.id = mo.id_director WHERE rs.id = ? AND me.is_rented = 0',
            [id]
          )
          .resolves(true);

        const closeConnectionExpectation = mysqlMock
          .expects('closeConnection')
          .returns('');

        await readRentalStoreMoviesByIsRentedState(id).then((result) => {
          // @ts-ignore
          execQueryExpectation.verify();
          // @ts-ignore
          closeConnectionExpectation.verify();
          assert.isTrue(result);
        });
      });

      it('If execQuery throws an error', async () => {
        const id = 94;

        // @ts-ignore
        sinon.stub(utils, 'startConnection').returns('connection');
        const mysqlMock = sinon.mock(MySQL);
        const execQueryExpectation = mysqlMock
          .expects('execQuery')
          .withArgs(
            'connection',
            'SELECT me.id, mo.title, md.name, me.is_rented FROM rental_store AS rs INNER JOIN rental_store_has_media AS rshm ON rshm.id_rental_store = rs.id INNER JOIN media AS me ON me.id = rshm.id_media INNER JOIN movie AS mo ON mo.id = me.id_movie  INNER JOIN movie_director AS md ON md.id = mo.id_director WHERE rs.id = ? AND me.is_rented = 0',
            [id]
          )
          .rejects('Error caught');

        const closeConnectionExpectation = mysqlMock
          .expects('closeConnection')
          .returns('');

        await readRentalStoreMoviesByIsRentedState(id).catch((error) => {
          // @ts-ignore
          execQueryExpectation.verify();
          // @ts-ignore
          closeConnectionExpectation.verify();
          assert.equal(error, 'Error caught');
        });
      });
    });
  });

  describe('When involking readRentalStoreMoviesByMovieTitle', () => {
    describe('Should involke startConnection, execQuery with select statement and closeConnection', () => {
      it('If there are no errors in the execQuery', async () => {
        const id = 94;
        const title = 'Test';

        // @ts-ignore
        sinon.stub(utils, 'startConnection').returns('connection');
        const mysqlMock = sinon.mock(MySQL);
        const execQueryExpectation = mysqlMock
          .expects('execQuery')
          .withArgs(
            'connection',
            'SELECT me.id, mo.title, md.name, me.is_rented FROM rental_store AS rs INNER JOIN rental_store_has_media AS rshm ON rshm.id_rental_store = rs.id INNER JOIN media AS me ON me.id = rshm.id_media INNER JOIN movie AS mo ON mo.id = me.id_movie  INNER JOIN movie_director AS md ON md.id = mo.id_director WHERE rs.id = ? AND mo.title LIKE ?',
            [id, title]
          )
          .resolves(true);

        const closeConnectionExpectation = mysqlMock
          .expects('closeConnection')
          .returns('');

        await readRentalStoreMoviesByMovieTitle(id, title).then((result) => {
          // @ts-ignore
          execQueryExpectation.verify();
          // @ts-ignore
          closeConnectionExpectation.verify();
          assert.isTrue(result);
        });
      });

      it('If execQuery throws an error', async () => {
        const id = 94;
        const title = 'Test';

        // @ts-ignore
        sinon.stub(utils, 'startConnection').returns('connection');
        const mysqlMock = sinon.mock(MySQL);
        const execQueryExpectation = mysqlMock
          .expects('execQuery')
          .withArgs(
            'connection',
            'SELECT me.id, mo.title, md.name, me.is_rented FROM rental_store AS rs INNER JOIN rental_store_has_media AS rshm ON rshm.id_rental_store = rs.id INNER JOIN media AS me ON me.id = rshm.id_media INNER JOIN movie AS mo ON mo.id = me.id_movie  INNER JOIN movie_director AS md ON md.id = mo.id_director WHERE rs.id = ? AND mo.title LIKE ?',
            [id, title]
          )
          .rejects('Error caught');

        const closeConnectionExpectation = mysqlMock
          .expects('closeConnection')
          .returns('');

        await readRentalStoreMoviesByMovieTitle(id, title).catch((error) => {
          // @ts-ignore
          execQueryExpectation.verify();
          // @ts-ignore
          closeConnectionExpectation.verify();
          assert.equal(error, 'Error caught');
        });
      });
    });
  });

  describe('When involking updateMediaById', () => {
    describe('Should involke startConnection, execQuery with update statement and closeConnection', () => {
      it('If there are no errors in the execQuery', async () => {
        const id = 94;
        const isRented = true;

        // @ts-ignore
        sinon.stub(utils, 'startConnection').returns('connection');
        const mysqlMock = sinon.mock(MySQL);
        const execQueryExpectation = mysqlMock
          .expects('execQuery')
          .withArgs(
            'connection',
            'UPDATE media SET is_rented = ? WHERE id = ?',
            [isRented, id]
          )
          .resolves(true);

        const closeConnectionExpectation = mysqlMock
          .expects('closeConnection')
          .returns('');

        await updateMediaById(id, isRented).then((result) => {
          // @ts-ignore
          execQueryExpectation.verify();
          // @ts-ignore
          closeConnectionExpectation.verify();
          assert.isTrue(result);
        });
      });

      it('If execQuery throws an error', async () => {
        const id = 94;
        const isRented = true;

        // @ts-ignore
        sinon.stub(utils, 'startConnection').returns('connection');
        const mysqlMock = sinon.mock(MySQL);
        const execQueryExpectation = mysqlMock
          .expects('execQuery')
          .withArgs(
            'connection',
            'UPDATE media SET is_rented = ? WHERE id = ?',
            [isRented, id]
          )
          .rejects('Error caught');

        const closeConnectionExpectation = mysqlMock
          .expects('closeConnection')
          .returns('');

        await updateMediaById(id, isRented).catch((error) => {
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
