import bcrypt from 'bcrypt';
import { Request, Response } from 'express';

import { User } from '@models';

const register = async (body: { email: any; password: any }) => {
  try {
    const { email, password } = body;

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({ email: email, password: hashedPassword });

    await user.save();

    return true;
  } catch (e) {
    return false;
  }
};

export default { register };
