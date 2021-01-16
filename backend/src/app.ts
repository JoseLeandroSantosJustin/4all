import bodyParser from 'body-parser';
import express from 'express';
import { userExpressRouter } from './components/user';
import { loginExpressRouter } from './components/login';

const app = express();
app.use(bodyParser.json());
app.use('/users', userExpressRouter);
app.use('/login', loginExpressRouter);

export default app;
