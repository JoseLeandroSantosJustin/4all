import { Router } from 'express';
import * as userController from './userController';
import { errorHandler } from './userErrors';

const userExpressRouter = Router();

userExpressRouter.get('', (req, res) => {
  userController
    .readAllUsers()
    .then((result) => {
      if (result.length > 0) {
        res.status(200).send(result).end();
      } else {
        res.status(204).send(result).end();
      }
    })
    .catch((error) => {
      const errorHandled = errorHandler(error);

      res.status(errorHandled.statusCode).send(errorHandled.message).end();
    });
});

userExpressRouter.post('', (req, res) => {
  userController
    .createUser(req.body.email, req.body.password, req.body.name)
    .then((result) => {
      res.status(201).send(result).end();
    })
    .catch((error) => {
      const errorHandled = errorHandler(error);

      res.status(errorHandled.statusCode).send(errorHandled.message).end();
    });
});

export default userExpressRouter;
