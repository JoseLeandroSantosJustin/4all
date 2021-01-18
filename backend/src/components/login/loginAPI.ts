import { Router } from 'express';
import * as loginController from './loginController';
import { errorHandler } from './loginErrors';

const loginExpressRouter = Router();

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

loginExpressRouter.post('/logon', (req, res) => {
  loginController
    .logon(req.body.email, req.body.password)
    .then((result) => {
      responseFormat(res, 200, result, true);
    })
    .catch((error) => {
      const errorHandled = errorHandler(error);

      responseFormat(res, errorHandled.statusCode, errorHandled.message, false);
    });
});

loginExpressRouter.post('/logout/:id', (req, res) => {
  loginController
    .logout(req.body.token, Number(req.params.id))
    .then((result) => {
      responseFormat(res, 200, result, true);
    })
    .catch((error) => {
      const errorHandled = errorHandler(error);

      responseFormat(res, errorHandled.statusCode, errorHandled.message, false);
    });
});

export default loginExpressRouter;
