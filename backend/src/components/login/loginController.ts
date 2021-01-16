import joi from 'joi';
import User from './User';
import { readUserByEmail } from './userDAL';
import bcrypt from 'bcrypt';
import { generateUniqId } from './utils';
import {
  createUserHasToken,
  updateIsConnectedUserHasTokenByTokenAndId
} from './loginDAL';

const logon = (email: string, password: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    const schema = joi.object({
      email: joi.string().required(),
      password: joi.string().required()
    });

    const receivedValues = {
      email: email,
      password: password
    };

    const receivedValuesValidation = schema.validate(receivedValues, {
      abortEarly: false
    });

    if (receivedValuesValidation.error !== undefined)
      return reject(receivedValuesValidation.error);

    const user = new User(email, password);
    readUserByEmail(user)
      .then((readUserByEmailResult) => {
        if (!bcrypt.compareSync(password, readUserByEmailResult[0].password)) {
          throw new joi.ValidationError(
            'User and password do not match',
            '',
            ''
          );
        }

        user.setId(readUserByEmailResult[0].id);
        const token = generateUniqId(readUserByEmailResult[0].id);
        createUserHasToken(token, user)
          .then(() => {
            resolve({
              id: user.getId(),
              email: user.getEmail(),
              password: 'Password is hidden',
              token: token
            });
          })
          .catch((error) => {
            reject(error);
          });
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const logout = (token: string, id: number): Promise<any> => {
  return new Promise((resolve, reject) => {
    const schema = joi.object({
      token: joi.string().required(),
      id: joi.number().required()
    });

    const receivedValues = {
      token: token,
      id: id
    };

    const receivedValuesValidation = schema.validate(receivedValues, {
      abortEarly: false
    });

    if (receivedValuesValidation.error !== undefined)
      return reject(receivedValuesValidation.error);

    updateIsConnectedUserHasTokenByTokenAndId(token, id)
      .then((result) => {
        // @ts-ignore
        if (result.changedRows > 0) {
          resolve({ id: id, token: token, message: 'Disconnected' });
        } else {
          resolve({
            id: id,
            token: token,
            message: 'The token no longer exists'
          });
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export { logon, logout };
