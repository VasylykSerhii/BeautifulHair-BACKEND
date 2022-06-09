import { Model } from 'mongoose';

import { IUserDocument } from '@interfaces';

export interface IUserModel extends Model<IUserDocument> {}
