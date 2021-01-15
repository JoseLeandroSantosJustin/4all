import User from './User';
import { assert } from 'chai';

describe('Unit test login/User', () => {
  describe('When instatiating User', () => {
    describe('Should return the id', () => {
      it('If is not undefined', () => {
        const user = new User('teste', 'teste@teste.com', 94);

        assert.equal(user.getId(), 94);
      });

      it('If is undefined', () => {
        const user = new User('teste', 'teste@teste.com', undefined);

        assert.equal(user.getId(), 0);
      });
    });

    describe('Should return the given formatted email', () => {
      it('If involkes getEmail', () => {
        const user = new User('teste@teste.com', '12345678');

        assert.equal(user.getEmail(), 'teste@teste.com');
      });
    });

    describe('Should return the given password', () => {
      it('If involkes getPassword', () => {
        const user = new User('teste@teste.com', '12345678');

        assert.equal(user.getPassword(), '12345678');
      });
    });
  });
});
