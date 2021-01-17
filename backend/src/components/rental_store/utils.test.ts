import winston from 'winston';
import { logger, startConnection } from './utils';
import { assert } from 'chai';
import sinon from 'sinon';
import config from 'config';
import MySQL from './MySQL';

describe('Unit test rental_store/utils file', () => {
  afterEach(() => {
    sinon.restore();
  });

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

    xit('DefaultMeta test');

    xit('Transports test');
  });

  describe('When involking startConnection', () => {
    it('Should involke MySQL.startConnection with mysql config variables', () => {
      const mysqlConfig = config.get('mysql');

      const startConnectionExpectation = sinon
        .mock(MySQL)
        .expects('startConnection')
        .withArgs(
          mysqlConfig.database,
          mysqlConfig.username,
          mysqlConfig.password,
          mysqlConfig.host,
          mysqlConfig.port
        );

      startConnection();
      startConnectionExpectation.verify();
    });
  });
});
