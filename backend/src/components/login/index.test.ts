import { assert } from 'chai';
import loginAPI from './loginAPI';
import { loginExpressRouter } from './index';

describe('Unit test login/index', () => {
  it('Testing if index export loginExpressRouter from loginAPI', () => {
    assert.equal(loginExpressRouter, loginAPI);
  });
});
