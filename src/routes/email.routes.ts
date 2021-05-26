import { Router } from 'express';

import { emailController } from '@controllers';
const authRouter = Router();

authRouter.post('/sendEmail', emailController.sendEmail);

export default authRouter;
