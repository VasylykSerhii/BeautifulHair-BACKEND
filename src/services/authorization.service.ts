import bcrypt from 'bcrypt';

import { validationMessages } from '@constants';
import { ClientError, User } from '@models';
import { createJwtToken, env } from '@utils';

const setAuth = async (userId: string, userRole: string) => {
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

const register = async (body: { email: string; password: string }) => {
  const { email, password } = body;

  const hashedPassword = await bcrypt.hash(password, 12);
  const user = new User({ email, password: hashedPassword, role: 'User' });

  await User.create(user);

  return setAuth(user.id, user.role);
};

const login = async (body: { email: string; password: string }) => {
  const { email, password } = body;

  const user = await User.findOne({ email });

  if (!user || !bcrypt.compareSync(password, user.password)) {
    throw new ClientError(validationMessages.invalidLogin);
  }

  return setAuth(user.id, user.role);
};

export default { register, login };
