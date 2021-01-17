import { startConnection } from './utils';
import MySQL from './MySQL';

/**
 * @param id Rental store ID
 */
const readRentalStoreMoviesByIsRentedState = (id: number): Promise<any> => {
  return new Promise((resolve, reject) => {
    const connection = startConnection();

    MySQL.execQuery(
      connection,
      'SELECT me.id, mo.title, md.name, me.is_rented FROM rental_store AS rs INNER JOIN rental_store_has_media AS rshm ON rshm.id_rental_store = rs.id INNER JOIN media AS me ON me.id = rshm.id_media INNER JOIN movie AS mo ON mo.id = me.id_movie  INNER JOIN movie_director AS md ON md.id = mo.id_director WHERE rs.id = ? AND me.is_rented = 0',
      [id]
    )
      .then((result) => {
        MySQL.closeConnection(connection);
        resolve(result);
      })
      .catch((error) => {
        MySQL.closeConnection(connection);
        reject(error);
      });
  });
};

/**
 * @param id Rental store ID
 * @param title Movie title
 */
const readRentalStoreMoviesByMovieTitle = (
  id: number,
  title: string
): Promise<Array<any>> => {
  return new Promise((resolve, reject) => {
    const connection = startConnection();

    MySQL.execQuery(
      connection,
      'SELECT me.id, mo.title, md.name, me.is_rented FROM rental_store AS rs INNER JOIN rental_store_has_media AS rshm ON rshm.id_rental_store = rs.id INNER JOIN media AS me ON me.id = rshm.id_media INNER JOIN movie AS mo ON mo.id = me.id_movie  INNER JOIN movie_director AS md ON md.id = mo.id_director WHERE rs.id = ? AND mo.title LIKE ?',
      [id, title]
    )
      .then((result) => {
        MySQL.closeConnection(connection);
        resolve(result);
      })
      .catch((error) => {
        MySQL.closeConnection(connection);
        reject(error);
      });
  });
};

/**
 * @param id Media ID
 * @param isRented Media rented state
 */
const updateMediaById = (
  id: number,
  isRented: boolean
): Promise<Array<any>> => {
  return new Promise((resolve, reject) => {
    const connection = startConnection();

    MySQL.execQuery(connection, 'UPDATE media SET is_rented = ? WHERE id = ?', [
      isRented,
      id
    ])
      .then((result) => {
        MySQL.closeConnection(connection);
        resolve(result);
      })
      .catch((error) => {
        MySQL.closeConnection(connection);
        reject(error);
      });
  });
};

export {
  readRentalStoreMoviesByIsRentedState,
  readRentalStoreMoviesByMovieTitle,
  updateMediaById
};
