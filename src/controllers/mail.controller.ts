import { Request, Response } from 'express';

import { ClientError } from '@models';
import { mailService } from '@services';
import { validate } from '@utils';
import { sendEmailSchema } from '@validation';

const sendEmail = async (req: Request, res: Response) => {
  try {
    validate(sendEmailSchema, req.body);
    res.status(200).json({});
    await mailService.sendEmail(req.body);
  } catch (error: any) {
    throw new ClientError(error.message);
  }
};

export default { sendEmail };
