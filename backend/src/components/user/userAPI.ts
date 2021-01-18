import { Router } from 'express';
import * as userController from './userController';
import { errorHandler } from './userErrors';

const userExpressRouter = Router();

const responseFormat = (
  res,
  statusCode: number,
  result: any,
  success: boolean
) => {
  if (success) {
    res.status(statusCode).json({ data: result }).end();
  } else {
    res.status(statusCode).json({ error: result }).end();
  }
};

userExpressRouter.get('', (req, res) => {
  userController
    .readAllUsers()
    .then((result) => {
      if (result.length > 0) {
        responseFormat(res, 200, result, true);
      } else {
        responseFormat(res, 204, result, true);
      }
    })
    .catch((error) => {
      const errorHandled = errorHandler(error);

      responseFormat(res, errorHandled.statusCode, errorHandled.message, false);
    });
});

userExpressRouter.post('', (req, res) => {
  userController
    .createUser(req.body.email, req.body.password, req.body.name)
    .then((result) => {
      responseFormat(res, 201, result, true);
    })
    .catch((error) => {
      const errorHandled = errorHandler(error);

      responseFormat(res, errorHandled.statusCode, errorHandled.message, false);
    });
});

export default userExpressRouter;
