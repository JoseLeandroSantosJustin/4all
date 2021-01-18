import { Router } from 'express';
import * as rentalStoreController from './rentalStoreController';
import { errorHandler } from './rentalStoreErrors';

const rentalStoreExpressRouter = Router();

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

rentalStoreExpressRouter.get('/:id/movies?', (req, res) => {
  if (req.query.title !== undefined) {
    rentalStoreController
      //@ts-ignore
      .readRentalStoreMoviesByMovieTitle(req.params.id, req.query.title)
      .then((result) => {
        if (result.length > 0) {
          responseFormat(res, 200, result, true);
        } else {
          responseFormat(res, 204, result, true);
        }
      })
      .catch((error) => {
        const errorHandled = errorHandler(error);

        responseFormat(
          res,
          errorHandled.statusCode,
          errorHandled.message,
          false
        );
      });
  } else {
    rentalStoreController
      .readRentalStoreMoviesByIsRentedState(
        //@ts-ignore
        req.params.id,
        req.query.isRented === 'true' ? true : false
      )
      .then((result) => {
        if (result.length > 0) {
          responseFormat(res, 200, result, true);
        } else {
          responseFormat(res, 204, result, true);
        }
      })
      .catch((error) => {
        const errorHandled = errorHandler(error);

        responseFormat(
          res,
          errorHandled.statusCode,
          errorHandled.message,
          false
        );
      });
  }
});

rentalStoreExpressRouter.post('/:idRentalStore/media/:idMedia', (req, res) => {
  rentalStoreController
    //@ts-ignore
    .updateMediaById(req.params.idMedia, req.body.isRented)
    .then((result) => {
      responseFormat(res, 200, result, true);
    })
    .catch((error) => {
      const errorHandled = errorHandler(error);

      responseFormat(res, errorHandled.statusCode, errorHandled.message, false);
    });
});

export default rentalStoreExpressRouter;
