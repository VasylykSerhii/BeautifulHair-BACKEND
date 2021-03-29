import { Schema, model } from 'mongoose';

export const userSchema = new Schema({
  email: { type: String, require: true, unique: true },
  password: { type: String, require: true },
});

const userModel = model('User', userSchema);
export default userModel;
