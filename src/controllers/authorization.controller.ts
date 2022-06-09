import { NextFunction, Request, Response } from 'express';

import { authorizationService } from '@services';
import { validate } from '@utils';
import { authSchema, refreshTokenSchema } from '@validation';

const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    validate(authSchema, req.body);
    const data = await authorizationService.auth(req.body);
    res.json(data);
  } catch (error) {
    next(error);
  }
};

const token = (_req: Request, res: Response) => {
  res.json({ status: 'success' });
};

const refreshToken = (req: Request, res: Response) => {
  validate(refreshTokenSchema, req.body);
  const data = authorizationService.refreshToken(req.body);
  res.json(data);
};

export default { auth, token, refreshToken };
