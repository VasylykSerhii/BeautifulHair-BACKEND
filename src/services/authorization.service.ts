import { Response } from 'express';
import { getAuth } from 'firebase-admin/auth';
import jwt from 'jsonwebtoken';

import { validationMessages } from '@constants';
import { IRefreshToken, ITokenData } from '@interfaces';
import { ClientError, User } from '@models';
import { createJwtToken, env, verifyJwtToken } from '@utils';

const setAuth = (userId: string, userRole: string) => {
  const authToken = createJwtToken(
    { id: userId, role: userRole },
    env.authorizationTokenDuration,
  );
  const refreshToken = createJwtToken(
    { id: userId, role: userRole },
    env.refreshTokenDuration,
  );

  return {
    access_token: authToken,
    refresh_token: refreshToken,
  };
};

const auth = async ({ idToken }: { idToken: string }) => {
  try {
    const { name, email, uid: fb_id } = await getAuth().verifyIdToken(idToken);

    const findUser = await User.findOne({
      email,
      fb_id,
    }).exec();

    if (findUser) {
      const user = findUser.toObject();

      return { user, token: setAuth(user.id, user.role) };
    }

    if (!findUser) {
      const newUser = new User({
        name,
        email,
        fb_id,
        role: 'User',
      });
      await User.create(newUser);
      const findNewUser = await User.findOne({
        email,
        fb_id,
      }).exec();

      if (findNewUser) {
        const user = findNewUser.toObject();

        return { user, token: setAuth(user.id, user.role) };
      }
    }
  } catch (error: any) {
    throw new ClientError(error?.message);
  }
};

const refreshToken = ({ refresh_token }: IRefreshToken) => {
  try {
    const authData = verifyJwtToken(refresh_token);

    return setAuth(authData.id, authData.role);
  } catch (error) {
    throw new ClientError(validationMessages.invalidAuthorizationToken, 400);
  }
};

export default { auth, refreshToken };
