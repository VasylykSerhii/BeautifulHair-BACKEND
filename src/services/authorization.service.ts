import bcrypt from 'bcrypt';

import { User } from '@models';

const register = async (body: { email: string; password: string }) => {
  try {
    const { email, password } = body;

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({ email, password: hashedPassword });

    await user.save();

    return true;
  } catch (e) {
    return false;
  }
};

export default { register };
