import 'dotenv/config';
import 'reflect-metadata';

import cors from 'cors';
import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';

import { AppError } from '../../errors/AppError';
import { createDatabaseConnection } from '../typeorm';
import { routes } from './routes';

import '../../container';

createDatabaseConnection();

const app = express();

app.use(express.json());
app.use(cors());
app.use(routes);

app.get('/', (request, response) => {
  return response.json({
    message: 'hello world!',
  });
});

app.use(
  (err: Error, resquest: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        message: err.message,
        statusCode: err.statusCode,
      });
    }

    console.error(err);

    return response.status(500).json({
      message: 'Internal server error',
      statusCode: 500,
    });
  }
);

export { app };
