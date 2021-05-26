import { Request, Response } from 'express';

import { mailService } from '@services';
import { validate } from '@utils';
import { sendEmailSchema } from '@validation';

const sendEmail = async (req: Request, res: Response) => {
  validate(sendEmailSchema, req.body);
  const mail = await mailService.sendEmail(req.body);
  res.json(mail);
};

export default { sendEmail };
