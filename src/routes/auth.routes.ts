import { Router } from 'express';

import { authorizationController } from '@controllers';
const authRouter = Router();

authRouter.post('/', authorizationController.auth);

export default authRouter;
