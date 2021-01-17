import { readUserHasTokenByToken } from './loginDAL';
import { logger } from './utils';
import { Request, Response, NextFunction } from 'express';

/**
 * Express middleware
 * Middleware to authenticate the user request
 */
const authenticationExpressRouter = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const authorizationHeader = String(req.get('Authorization'));
  const token = authorizationHeader.slice(authorizationHeader.indexOf(' ') + 1);

  readUserHasTokenByToken(token)
    .then((result) => {
      if (result.length === 0) {
        res
          .status(401)
          .type('application/json')
          .send({
            error: 'Authentication failed, try again with another token'
          })
          .end();
      } else if (
        new Date(result[0].last_access_date).getTime() + 3600000 <
        new Date().getTime()
      ) {
        res
          .status(401)
          .type('application/json')
          .send({ error: 'Authentication failed, expired token' })
          .end();
      } else {
        next();
      }
    })
    .catch((error) => {
      logger.error({ message: error.message, stack: error.stack });

      res
        .status(500)
        .type('application/json')
        .send({ error: 'Error while authenticating, try again later' })
        .end();
    });
};

export default authenticationExpressRouter;
