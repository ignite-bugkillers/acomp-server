import 'dotenv/config';
import 'reflect-metadata';

import cors from 'cors';
import express from 'express';

import { createDatabaseConnection } from '../typeorm';
import { routes } from './routes';

createDatabaseConnection();

const app = express();

app.use(express.json());
app.use(cors());
app.use(routes);

app.get('/', (request, response) => {
  return response.json({
    message: 'hello word',
  });
});

export { app };
