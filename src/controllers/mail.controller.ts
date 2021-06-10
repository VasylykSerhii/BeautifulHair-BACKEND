import { Request, Response } from 'express';

import { ClientError } from '@models';
import { mailService } from '@services';
import { validate } from '@utils';
import { sendEmailSchema } from '@validation';

const sendEmail = async (req: Request, res: Response) => {
  try {
    validate(sendEmailSchema, req.body);
    const mail = await mailService.sendEmail(req.body);
    res.status(200).json(mail);
  } catch (error) {
    throw new ClientError(error.message);
  }
};

export default { sendEmail };
