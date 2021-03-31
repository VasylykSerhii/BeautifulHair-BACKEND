import { Request, Response } from 'express';

import { authorizationService } from '@services';
import { validate } from '@utils';
import { createUserSchema, loginUserSchema } from '@validation';

const register = async (req: Request, res: Response) => {
  validate(createUserSchema, req.body);
  const token = await authorizationService.register(req.body);
  res.json(token);
};

const login = async (req: Request, res: Response) => {
  validate(loginUserSchema, req.body);
  const token = await authorizationService.login(req.body);
  res.json(token);
};

export default { register, login };
