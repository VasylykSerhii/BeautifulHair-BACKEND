import { Router } from 'express';

import authRouter from './auth.routes';
import emailRouter from './email.routes';

const routes = Router();

routes.use('/auth', authRouter);
routes.use('/mail', emailRouter);

export default routes;
