import bodyParser from 'body-parser';
import express from 'express';
import { userExpressRouter } from './components/user';
import {
  loginExpressRouter,
  authenticationExpressRouter
} from './components/login';
import { rentalStoreExpressRouter } from './components/rental_store';

const app = express();
app.use(bodyParser.json());
app.use('/users', userExpressRouter);
app.use('/login', loginExpressRouter);
app.use(authenticationExpressRouter);
app.use('/rental-store', rentalStoreExpressRouter);

export default app;
