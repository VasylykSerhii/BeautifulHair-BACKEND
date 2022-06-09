import { Handlers } from '@sentry/node';
import { json, raw, text, urlencoded } from 'body-parser';
import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import { credential } from 'firebase-admin';
import { initializeApp } from 'firebase-admin/app';
import mongoose from 'mongoose';

import { sentryMiddleware } from '@middlewares';
import { ClientError } from '@models';
import { errorResponseHandler } from '@responses';
import routes from '@routes';
import { env } from '@utils';

const app = express();

app.use(Handlers.requestHandler());
app.use(Handlers.tracingHandler());

app.use(json());
app.use(cors());
app.use(raw());
app.use(text());
app.use(urlencoded({ extended: true }));

app.use('/v1', routes);

const port = env.port || 3001;

initializeApp({
  credential: credential.cert('./firebase.json'),
});

mongoose.connect(env.connectionString, () => {
  console.log('> Connected to db');
});

app.use((error: Error, _req: Request, res: Response, _next: NextFunction) => {
  if (error instanceof ClientError) {
    res
      .status(error.status || 400)
      .json(errorResponseHandler.getClientErrorResponse(error));

    return;
  }

  res.status(500).json(errorResponseHandler.getServerErrorResponse(error));
});

app.use(sentryMiddleware);

app.listen(port, () => {
  console.log(`> Listening on port ${port}`);
});
