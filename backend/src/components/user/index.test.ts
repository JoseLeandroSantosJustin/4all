import { assert } from 'chai';
import userAPI from './userAPI';
import { userExpressRouter } from './index';

describe('Unit test user/index', () => {
  it('Testing if index export userExpressRouter from userAPI', () => {
    assert.equal(userExpressRouter, userAPI);
  });
});
