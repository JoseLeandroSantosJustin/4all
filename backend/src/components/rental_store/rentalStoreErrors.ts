import { ValidationError } from 'joi';
import { logger } from './utils';

class RentalStoreError {
  public statusCode: number;
  public message: string;

  constructor(message: string, statusCode: number) {
    this.message = message;
    this.statusCode = statusCode;
  }
}

const errorHandler = (error: Error): RentalStoreError => {
  if (error instanceof ValidationError)
    return new RentalStoreError(error.message, 400);

  // @ts-ignore
  if (error.sqlState !== undefined) return mysqlErrors(error);

  // @ts-ignore
  logger.error({ message: error.message, stack: error.stack });

  return new RentalStoreError('Unknown system error', 500);
};

const mysqlErrors = (error: Error): RentalStoreError => {
  // @ts-ignore
  if (error.sqlState == 23000) {
    // @ts-ignore
    return new RentalStoreError(error.sqlMessage, 400);
  }

  if (
    // @ts-ignore
    error.sqlState == 42000 ||
    // @ts-ignore
    error.sqlState == 28000
  ) {
    // @ts-ignore
    logger.error({ message: error.sqlMessage, stack: error.stack });

    return new RentalStoreError('Could not connect to the database', 500);
  }

  // @ts-ignore
  logger.error({ message: error.sqlMessage, stack: error.stack });

  return new RentalStoreError('Unknown database error', 500);
};

export { RentalStoreError, errorHandler };
