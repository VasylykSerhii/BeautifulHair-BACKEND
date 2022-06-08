import { model, Schema } from 'mongoose';

export const userSchema = new Schema({
  email: { type: String, require: true, unique: true },
  name: { type: String, require: true },
  fb_id: { type: String, require: true },
  role: { type: String, require: true },
});

const userModel = model('User', userSchema);
export default userModel;
