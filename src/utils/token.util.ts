import jwt from 'jsonwebtoken';

import { env } from './env';

interface ITokenData {
  id: string;
  role: string;
}

export const createJwtToken = (
  data: any = null,
  expirationTime: string = env.authorizationTokenDuration,
) => {
  const token = jwt.sign(
    {
      ...data,
    },
    env.jwtSecret,
    { expiresIn: expirationTime },
  );

  return token;
};

export const verifyJwtToken = (token: string) =>
  jwt.verify(token, env.jwtSecret) as ITokenData;

export default {
  createJwtToken,
  verifyJwtToken,
};
