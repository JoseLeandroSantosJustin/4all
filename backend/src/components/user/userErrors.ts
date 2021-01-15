import { ValidationError } from 'joi';
import { logger } from './utils';

class UserError {
  public statusCode: number;
  public message: string;

  constructor(message: string, statusCode: number) {
    this.message = message;
    this.statusCode = statusCode;
  }
}

const errorHandler = (error: Error): UserError => {
  if (error instanceof ValidationError)
    return new UserError(error.message, 400);

  // @ts-ignore
  if (error.sqlState !== undefined) return mysqlErrors(error);

  // @ts-ignore
  logger.error({ message: error.message, stack: error.stack });

  return new UserError('Unknown system error', 500);
};

const mysqlErrors = (error: Error): UserError => {
  // @ts-ignore
  if (error.sqlState == 23000) return new UserError(error.sqlMessage, 400);

  if (
    // @ts-ignore
    error.sqlState == 42000 ||
    // @ts-ignore
    error.sqlState == 28000
  ) {
    // @ts-ignore
    logger.error({ message: error.sqlMessage, stack: error.stack });

    return new UserError('Could not connect to the database', 500);
  }

  // @ts-ignore
  logger.error({ message: error.sqlMessage, stack: error.stack });

  return new UserError('Unknown database error', 500);
};

export { UserError, errorHandler };
