import * as userDAL from './userDAL';
import joi from 'joi';
import User from './User';

const createUser = (
  email: string,
  password: string,
  name: string
): Promise<User> => {
  return new Promise((resolve, reject) => {
    const schema = joi.object({
      email: joi.string().required(),
      password: joi.string().required(),
      name: joi.string().required()
    });

    const receivedValues = {
      email: email,
      password: password,
      name: name
    };

    const receivedValuesValidation = schema.validate(receivedValues, {
      abortEarly: false
    });

    if (receivedValuesValidation.error !== undefined)
      reject(receivedValuesValidation.error);

    const user = new User(name, email, password);
    userDAL
      .createUser(user)
      .then((result) => {
        user.setId(result.insertId);
        resolve(user);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const readAllUsers = (): Promise<Array<User>> => {
  return new Promise((resolve, reject) => {
    userDAL
      .readAllUsers()
      .then((result) => {
        const users: Array<User> = [];

        result.forEach((user) => {
          users.push(
            new User(user.name, user.email, 'Password is hidden', user.id)
          );
        });

        resolve(users);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export { createUser, readAllUsers };
