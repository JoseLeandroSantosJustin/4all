import winston from 'winston';
import moment from 'moment';
import uniqid from 'uniqid';

const logger = winston.createLogger({
  level: 'silly',
  levels: winston.config.npm.levels,
  format: winston.format.json({ space: 1 }),
  defaultMeta: { time: moment().format('HH:mm') },
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: `logs/login/errors_${moment().format('DD_MM_YYYY')}.log`
    })
  ]
});

const generateUniqId = (prefix: string): string => {
  return uniqid(prefix);
};

export { logger, generateUniqId };
