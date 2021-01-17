import { assert } from 'chai';
import rentalStoreAPI from './rentalStoreAPI';
import { rentalStoreExpressRouter } from './index';

describe('Unit test rental_store/index', () => {
  it('Testing if index export rentalStoreExpressRouter from rentalStoreAPI', () => {
    assert.equal(rentalStoreExpressRouter, rentalStoreAPI);
  });
});
