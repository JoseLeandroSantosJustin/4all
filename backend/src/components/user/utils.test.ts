import winston from 'winston';
import { logger, capitalizeAllFirstLetters, hashPassword } from './utils';
import { assert } from 'chai';
import moment from 'moment';
import sinon from 'sinon';
import bcrypt from 'bcrypt';
import config from 'config';

describe('Unit test user/utils file', () => {
  describe('When setting up logger constant', () => {
    it("Should set level to 'silly'", () => {
      assert.equal(logger.level, 'silly');
    });

    it("Should set levels to 'winston.config.npm.levels'", () => {
      assert.deepEqual(logger.levels, winston.config.npm.levels);
    });

    it("Should set format to 'winston.format.json({ space: 1 })'", () => {
      assert.deepEqual(logger.format, winston.format.json({ space: 1 }));
    });

    it("Should set defaultMeta to '{ time: moment().format('HH:mm') }'", async () => {
      assert.deepEqual(logger.defaultMeta, { time: moment().format('HH:mm') });
    });

    xit('Transports test');
  });

  describe('When involking capitalizeAllFirstLetters', () => {
    describe('Should captalize all just first initial letters from a setence', () => {
      it('Then return the new given sentence', () => {
        assert.equal(
          capitalizeAllFirstLetters('jOSE lEANDRO sANTOS jUSTIN'),
          'Jose Leandro Santos Justin'
        );
      });
    });
  });

  describe('When involking "hashPassword"', () => {
    describe('Should involke "hashSync" from bcrypt', () => {
      it('With given password And bcrypt.salt state of default config json', () => {
        const password = '12345678';
        const bcryptSpy = sinon
          .spy(bcrypt, 'hashSync')
          .withArgs(password, config.get('bcrypt').salt);

        hashPassword(password);
        assert.isTrue(bcryptSpy.calledOnce);
      });
    });
  });
});
