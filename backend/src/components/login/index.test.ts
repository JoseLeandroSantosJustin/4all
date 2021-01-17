import { assert } from 'chai';
import loginAPI from './loginAPI';
import { loginExpressRouter } from './index';
import loginService from './loginService';
import { authenticationExpressRouter } from './index';

describe('Unit test login/index', () => {
  it('Testing if index export loginExpressRouter from loginAPI', () => {
    assert.equal(loginExpressRouter, loginAPI);
  });

  it('Testing if index export authenticationExpressRouter from loginService', () => {
    assert.equal(authenticationExpressRouter, loginService);
  });
});
