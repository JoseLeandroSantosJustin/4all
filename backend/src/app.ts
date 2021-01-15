import bodyParser from 'body-parser';
import express from 'express';
import { userExpressRouter } from './components/user';

const app = express();
app.use(bodyParser.json());
app.use('/users', userExpressRouter);

export default app;
