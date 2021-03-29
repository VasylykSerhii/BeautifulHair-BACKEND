import { Request, Response } from 'express';

import { authorizationService } from '@services';
import { validate } from '@utils';
import { createUserSchema } from '@validation';

const register = async (req: Request, res: Response) => {
  validate(createUserSchema, req.body);
  const isRegistered = await authorizationService.register(req.body);
  if (isRegistered) {
    res.status(201).json({ message: 'User created' });
  } else {
    res.status(500).json({ message: 'Something went wrong!' });
  }
};

export default { register };
