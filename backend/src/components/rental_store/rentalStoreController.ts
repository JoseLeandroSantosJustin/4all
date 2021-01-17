import joi from 'joi';
import * as rentalStoreDAL from './rentalStoreDAL';
import Media from './Media';

/**
 * Function to read all available movies from a rental store
 * @param id Rental store ID
 */
const readRentalStoreMoviesByIsRentedState = (
  id: number
): Promise<Array<Media>> => {
  return new Promise((resolve, reject) => {
    const receivedValueValidation = joi.number().required().validate(id);
    if (receivedValueValidation.error !== undefined)
      return reject(receivedValueValidation.error);

    rentalStoreDAL
      .readRentalStoreMoviesByIsRentedState(id)
      .then((result) => {
        const medias: Array<Media> = [];

        result.forEach((media) => {
          medias.push(
            new Media(media.id, media.title, media.name, media.is_rented)
          );
        });

        resolve(medias);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

/**
 * Function to read all movies from a rental store with the given title
 * @param id Rental store ID
 * @param title Movie title
 */
const readRentalStoreMoviesByMovieTitle = (
  id: number,
  title: string
): Promise<Array<Media>> => {
  return new Promise((resolve, reject) => {
    const schema = joi.object({
      id: joi.number().required(),
      title: joi.string().required()
    });

    const receivedValues = {
      id: id,
      title: title
    };

    const receivedValuesValidation = schema.validate(receivedValues);
    if (receivedValuesValidation.error != undefined)
      return reject(receivedValuesValidation.error);

    rentalStoreDAL
      .readRentalStoreMoviesByMovieTitle(id, title)
      .then((result) => {
        const medias: Array<Media> = [];

        result.forEach((media) => {
          medias.push(
            new Media(media.id, media.title, media.name, media.is_rented)
          );
        });

        resolve(medias);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

/**
 * Chages media isRented state in the database
 * @param id Media ID
 * @param isRented Media isRented state
 */
const updateMediaById = (id: number, isRented: boolean): Promise<any> => {
  return new Promise((resolve, reject) => {
    const schema = joi.object({
      id: joi.number().required(),
      isRented: joi.boolean().required()
    });

    const receivedValues = {
      id: id,
      isRented: isRented
    };

    const receivedValuesValidation = schema.validate(receivedValues);
    if (receivedValuesValidation.error !== undefined)
      return reject(receivedValuesValidation.error);

    rentalStoreDAL
      .updateMediaById(id, isRented)
      .then((result) => {
        // @ts-ignore
        if (result.changedRows > 0) {
          resolve({ id: id, isRented: isRented, message: 'Media updated' });
        } else {
          resolve({
            id: id,
            isRented: isRented,
            message: `The isRented of the Media state is already ${isRented}`
          });
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export {
  readRentalStoreMoviesByIsRentedState,
  readRentalStoreMoviesByMovieTitle,
  updateMediaById
};
