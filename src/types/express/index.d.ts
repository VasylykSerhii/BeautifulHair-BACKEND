import { ITokenData } from '@interfaces';

declare global {
  namespace Express {
    interface Request {
      user: ITokenData;
    }
  }
}
