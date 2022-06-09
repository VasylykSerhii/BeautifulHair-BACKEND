import { model, Schema } from 'mongoose';

import { IUserDocument, IUserModel } from '@interfaces';

export const userSchema = new Schema(
  {
    email: { type: String, require: true, unique: true },
    name: { type: String, require: true },
    fb_id: { type: String, require: true },
    role: { type: String, require: true },
  },
  { versionKey: false },
);

// userSchema.set('toJSON', {
//   virtuals: true,
//   versionKey: false,
// });

// userSchema.virtual('id').get(function (this: IUserDocument) {
//   return this._id.toHexString();
// });

const userModel = model<IUserDocument, IUserModel>('User', userSchema);
export default userModel;
