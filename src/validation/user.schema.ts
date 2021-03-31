import Joi from 'joi';

import { ClientError, User } from '@models';

const method: Joi.CustomValidator = async (value, helpers) => {
  const candidate = await User.findOne({ email: value });

  if (candidate) {
    throw new ClientError('User already exists', 400, {
      email: value,
    });
  }

  return value;
};

export const createUserSchema = Joi.object({
  email: Joi.string().email().required().custom(method),
  password: Joi.string().min(6).required(),
});

export const loginUserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});
