import RentalStore from './RentalStore';
import { assert } from 'chai';

describe('Unit test rental_store/RentalStore', () => {
  describe('When instatiating RentalStore', () => {
    describe('Should return the given id', () => {
      it('If involkes getId', () => {
        const rentalStore = new RentalStore(94, 'Teste');

        assert.equal(rentalStore.getId(), 94);
      });
    });

    describe('Should return the given name', () => {
      it('If involkes getName', () => {
        const rentalStore = new RentalStore(94, 'Teste');

        assert.equal(rentalStore.getName(), 'Teste');
      });
    });
  });
});
