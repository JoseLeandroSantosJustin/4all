import { Router } from 'express';
import * as loginController from './loginController';
import { errorHandler } from './loginErrors';

const loginExpressRouter = Router();

loginExpressRouter.post('/logon', (req, res) => {
  loginController
    .logon(req.body.email, req.body.password)
    .then((result) => {
      res.status(200).send(result).end();
    })
    .catch((error) => {
      const errorHandled = errorHandler(error);

      res.status(errorHandled.statusCode).send(errorHandled.message).end();
    });
});

loginExpressRouter.post('/logout/:id', (req, res) => {
  loginController
    .logout(req.body.token, Number(req.params.id))
    .then((result) => {
      res.status(200).send(result).end();
    })
    .catch((error) => {
      const errorHandled = errorHandler(error);

      res.status(errorHandled.statusCode).send(errorHandled.message).end();
    });
});

export default loginExpressRouter;
