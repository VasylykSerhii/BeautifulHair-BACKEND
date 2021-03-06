import { NextFunction, Request, Response } from 'express';

import { ITokenData } from '@interfaces';
import { ClientError } from '@models';
import { verifyJwtToken } from '@utils';

export const checkToken = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      next(new ClientError('Unathorized', 401));

      return;
    }

    const token = authHeader.startsWith('Bearer ')
      ? authHeader.substring(7, authHeader.length)
      : authHeader;
    req.user = verifyJwtToken(token) as ITokenData;
    next();
  } catch (error) {
    next(new ClientError('Unathorized', 401));
  }
};

export const verifyRole = (role: string[]) =>
  function (req: Request, _res: Response, next: NextFunction) {
    try {
      if (!role.find((i) => i === req.user?.role)) {
        next(new ClientError('Forbidden', 403));

        return;
      }

      next();
    } catch (error) {
      next(error);
    }
  };

export default {
  checkToken,
  verifyRole,
};
