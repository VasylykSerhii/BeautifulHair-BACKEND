import { model, Schema } from 'mongoose';

import { IUserDocument, IUserModel } from '@interfaces';

export const userSchema = new Schema<IUserDocument, IUserModel>(
  {
    email: { type: String, require: true, unique: true },
    name: { type: String, require: true },
    fb_id: { type: String, require: true },
    role: { type: String, require: true },
  },
  { versionKey: false, timestamps: true },
);

userSchema.set('toObject', {
  virtuals: true,
  versionKey: false,
  transform: (_: any, ret: any) => {
    delete ret._id;
    delete ret.fb_id;

    return ret;
  },
});

userSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,

  transform: (_: any, ret: any) => {
    delete ret._id;
    delete ret.fb_id;

    return ret;
  },
});

userSchema.virtual('id').get(function (this: IUserDocument) {
  return this._id.toHexString();
});

const userModel = model<IUserDocument, IUserModel>('User', userSchema);
export default userModel;
