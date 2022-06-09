import { Router } from 'express';

import { authorizationController } from '@controllers';
import { authMiddleware } from '@middlewares';
const authRouter = Router();

authRouter.post('/', authorizationController.auth);
authRouter.post('/refresh_token', authorizationController.refreshToken);
authRouter.post(
  '/token',
  authMiddleware.checkToken,
  authorizationController.token,
);

export default authRouter;
