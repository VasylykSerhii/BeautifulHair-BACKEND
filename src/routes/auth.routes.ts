import { Router } from 'express';

import { authorizationController } from '@controllers';
const authRouter = Router();

authRouter.post('/register', authorizationController.register);
authRouter.post('/login', authorizationController.login);

export default authRouter;
