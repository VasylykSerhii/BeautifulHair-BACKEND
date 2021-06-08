const SibApiV3Sdk = require('sib-api-v3-typescript');

import { ClientError } from '@models';
import { env } from '@utils';

interface IBodyMail {
  email: string;
  text: string;
  name: string;
  phone: string;
}

const sendEmail = async (body: IBodyMail) => {
  const { email, text, phone, name } = body;

  var apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
  let apiKey = apiInstance.authentications['apiKey'];
  apiKey.apiKey = env.emailApi;

  const sendSmtpEmail = {
    to: [
      {
        email: email,
        name: name,
      },
    ],
    templateId: 1,
    params: {
      name,
      text,
    },
  };

  apiInstance.sendTransacEmail(sendSmtpEmail).then(
    function (data: string) {
      console.log(2);
      console.log('API called successfully. Returned data: ' + data);
    },
    function (error: any) {
      console.error(error);
      throw new ClientError(error);
    },
  );

  // await transporter.sendMail({
  //   from: '"Beauty Hair" vasylyk97@gmail.com', // sender address
  //   to: email, // list of receivers
  //   subject: 'Beauty Hair', // Subject line
  //   html: `<b>Привіт ${name} я згодом тобі перетелефоную</b><div> Ви звернулися з питанням:${text}</div>`, // html body
  // });

  // await transporter.sendMail({
  //   from: '"Beauty Hair" vasylyk97@gmail.com', // sender address
  //   to: 'buklivm@gmail.com', // list of receivers
  //   subject: 'Beauty Hair', // Subject line
  //   html: `<b>Привіт, мене звати ${name} у мене до вас декілька питать, ось мій номер телефону: ${phone}.</b> `, // html body
  // });

  return { message: 'saccess' };
};

export default { sendEmail };
