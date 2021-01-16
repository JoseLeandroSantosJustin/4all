import winston from 'winston';
import moment from 'moment';
import mysql from 'mysql2';
import MySQL from './MySQL';
import config from 'config';

const logger = winston.createLogger({
  level: 'silly',
  levels: winston.config.npm.levels,
  format: winston.format.json({ space: 1 }),
  defaultMeta: { time: moment().format('HH:mm') },
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: `logs/rental_store/errors_${moment().format('DD_MM_YYYY')}.log`
    })
  ]
});

const startConnection = (): mysql.Pool => {
  const mysqlConfig = config.get('mysql');

  return MySQL.startConnection(
    mysqlConfig.database,
    mysqlConfig.username,
    mysqlConfig.password,
    mysqlConfig.host,
    mysqlConfig.port
  );
};

export { logger, startConnection };
