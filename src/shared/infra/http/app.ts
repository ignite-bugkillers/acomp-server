import 'dotenv/config';
import 'reflect-metadata';

import cors from 'cors';
import express from 'express';

import { createDatabaseConnection } from '../typeorm';

createDatabaseConnection();

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (request, response) => {
  return response.json({
    message: 'hello word',
  });
});

export { app };
