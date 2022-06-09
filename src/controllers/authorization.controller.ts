import { Request, Response } from 'express';

import { authorizationService } from '@services';
import { validate } from '@utils';
import { authSchema } from '@validation';

const auth = async (req: Request, res: Response) => {
  validate(authSchema, req.body);
  const token = await authorizationService.auth(req.body);
  res.json(token);
};

const token = (_req: Request, res: Response) => {
  res.json({ status: 'success' });
};

export default { auth, token };
