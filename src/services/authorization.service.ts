import { getAuth } from 'firebase-admin/auth';

import { User } from '@models';
import { createJwtToken, env } from '@utils';

// need change user type
const setAuth = (user: any) => {
  const authToken = createJwtToken(user, env.authorizationTokenDuration);
  const refreshToken = createJwtToken(user, env.refreshTokenDuration);

  return {
    access_token: authToken,
    refresh_token: refreshToken,
  };
};

const auth = async ({ idToken }: { idToken: string }) => {
  const decodedToken = await getAuth().verifyIdToken(idToken);

  const data = {
    name: decodedToken.name,
    email: decodedToken.email,
    fb_id: decodedToken.uid,
    role: 'User',
  };

  const user = await User.findOne({
    email: data.email,
    fb_id: data.fb_id,
  });

  if (user) {
    return { user, token: setAuth(user) };
  }

  if (!user) {
    const newUser = new User(data);
    await User.create(newUser);
    const findNewUser = await User.findOne({
      email: data.email,
      fb_id: data.fb_id,
    });

    return { user: findNewUser, token: setAuth(findNewUser) };
  }
};

export default { auth };
