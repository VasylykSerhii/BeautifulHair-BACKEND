import { Handlers, init as sentryInit } from '@sentry/node';
import { json, raw, text, urlencoded } from 'body-parser';
import express, { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';

import { sentryConfigs } from '@configs';
import { sentryMiddleware } from '@middlewares';
import { ClientError } from '@models';
import { errorResponseHandler } from '@responses';
import routes from '@routes';
import { env } from '@utils';

const app = express();

app.use(Handlers.requestHandler());
app.use(Handlers.tracingHandler());

app.use(json());
app.use(raw());
app.use(text());
app.use(urlencoded({ extended: true }));

app.use('/api', routes);

const port = env.port || 3030;

mongoose.connect(
  env.connectionString,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  },
  () => {
    console.log('> Connected to db');
  },
);

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
