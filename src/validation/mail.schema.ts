import Joi from 'joi';

export const sendEmailSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  text: Joi.string(),
});
