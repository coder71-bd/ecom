// start an express project
import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import AppRoutes from './app/routes';
import { ERROR } from './app/utils/responseHelper';

const app: Application = express();

app.use(express.json());
app.use(cors());

app.get('/', (_req: Request, res: Response) => {
  res.send('Hello World!');
});

app.use('/api', AppRoutes);

app.use((_req: Request, res: Response) => {
  return ERROR(res, null, 'Route not found!', false, 404);
});

export default app;
