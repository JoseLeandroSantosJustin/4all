import { Router } from 'express';
import * as rentalStoreController from './rentalStoreController';
import { errorHandler } from './rentalStoreErrors';

const rentalStoreExpressRouter = Router();

rentalStoreExpressRouter.get('/:id/movies?', (req, res) => {
  if (req.query.title !== undefined) {
    rentalStoreController
      //@ts-ignore
      .readRentalStoreMoviesByMovieTitle(req.params.id, req.query.title)
      .then((result) => {
        res.status(200).send(result).end();
      })
      .catch((error) => {
        const errorHandled = errorHandler(error);

        res.status(errorHandled.statusCode).send(errorHandled.message).end();
      });
  } else {
    rentalStoreController
      .readRentalStoreMoviesByIsRentedState(
        //@ts-ignore
        req.params.id,
        req.query.isRented === 'true' ? true : false
      )
      .then((result) => {
        res.status(200).send(result).end();
      })
      .catch((error) => {
        const errorHandled = errorHandler(error);

        res.status(errorHandled.statusCode).send(errorHandled.message).end();
      });
  }
});

rentalStoreExpressRouter.post('/:idRentalStore/media/:idMedia', (req, res) => {
  rentalStoreController
    //@ts-ignore
    .updateMediaById(req.params.idMedia, req.body.isRented)
    .then((result) => {
      res.status(200).send(result).end();
    })
    .catch((error) => {
      const errorHandled = errorHandler(error);

      res.status(errorHandled.statusCode).send(errorHandled.message).end();
    });
});

export default rentalStoreExpressRouter;
