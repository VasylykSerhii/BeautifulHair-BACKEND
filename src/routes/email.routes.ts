import { Router } from 'express';

import { emailController } from '@controllers';
const authRouter = Router();

authRouter.post('/send', emailController.sendEmail);

export default authRouter;
