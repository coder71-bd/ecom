// start an express project
import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import AppRoutes from './app/routes';

const app: Application = express();

app.use(express.json());
app.use(cors());

app.get('/', (_req: Request, res: Response) => {
  res.send('Hello World!');
});

app.use('/api', AppRoutes);

export default app;
