import nodemailer from 'nodemailer';

import { env } from '@utils';
import { mailHtml } from '@view';

export interface IBodyMail {
  email: string;
  text: string;
  name: string;
  phone: string;
}

const sendEmail = async (body: IBodyMail) => {
  const { email, text, phone, name } = body;

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: env.nodemailerEmail, // generated ethereal user
      pass: env.nodemailerPass, // generated ethereal password
    },
  });

  await transporter.sendMail({
    from: '"Beauty Hair" vasylyk97@gmail.com', // sender address
    to: email, // list of receivers
    subject: 'Beauty Hair', // Subject line
    html: mailHtml({ text, name }), // html body
  });

  await transporter.sendMail({
    from: '"Beauty Hair" vasylyk97@gmail.com', // sender address
    to: 'buklivm@gmail.com', // list of receivers
    subject: 'Beauty Hair', // Subject line
    html: `<b>Привіт, мене звати ${name} у мене до вас декілька питать, ось мій номер телефону: ${phone}.</b> `, // html body
  });

  return { message: 'saccess' };
};

export default { sendEmail };
