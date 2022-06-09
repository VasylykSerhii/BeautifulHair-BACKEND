import Joi from 'joi';

export const authSchema = Joi.object({
  idToken: Joi.string().required(),
});

export const refreshTokenSchema = Joi.object({
  refresh_token: Joi.string().required(),
});
