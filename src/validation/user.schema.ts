import Joi from 'joi';

export const authSchema = Joi.object({
  idToken: Joi.string().required(),
});
