import User from './User';
import { assert } from 'chai';

describe('Unit test user/User', () => {
  describe('When involking setId', () => {
    describe('Should return the given id', () => {
      it('If involkes getId', () => {
        const user = new User();

        user.setId(94);
        assert.equal(user.getId(), 94);
      });
    });
  });

  describe('When involking setName', () => {
    describe('Should return the given formatted name', () => {
      it('If involkes getName', () => {
        const user = new User();

        user.setName('jose leandro santos justin');
        assert.equal(user.getName(), 'Jose Leandro Santos Justin');
      });
    });
  });

  describe('When involking setEmail', () => {
    describe('Should return the given formatted email', () => {
      it('If involkes getEmail', () => {
        const user = new User();

        user.setEmail('TesTE@tESte.COM');
        assert.equal(user.getEmail(), 'teste@teste.com');
      });
    });
  });

  describe('When involking setPassword', () => {
    describe('Should return the given password', () => {
      it('If involkes getPassword', () => {
        const user = new User();

        user.setPassword('12345678');
        assert.equal(user.getPassword(), '12345678');
      });
    });
  });
});
