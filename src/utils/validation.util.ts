import Joi from 'joi';

import { validationMessages } from '@constants';
import { ClientError } from '@models';

const validate = (validationSchema: Joi.ObjectSchema, params: object) => {
  if (!validationSchema) {
    throw new Error(validationMessages.invalidDataType);
  }

  const { error } = validationSchema.validate(params, {
    abortEarly: false,
  });

  if (error) {
    const errorsArray = error.details.reduce(
      (acc, el) => ({
        ...acc,
        [el.path.join('.')]: el.message,
      }),
      {},
    );

    throw new ClientError(validationMessages.invalidInput, 400, errorsArray);
  }
};

export default validate;
