import winston from 'winston';
import { logger, generateUniqId } from './utils';
import { assert } from 'chai';

describe('Unit test login/utils file', () => {
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

    xit('Transports test');
  });

  describe('When involking generateUniqId', () => {
    describe('Should return a random string', () => {
      it('With the given value prefixed', () => {
        const prefix = 'prefix';
        const uniquid = generateUniqId(prefix);

        const regex = /^prefix/;
        assert.isNotNull(uniquid.match(regex));
        assert.isAbove(uniquid.length, prefix.length);
      });
    });
  });
});
