import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  name: String;
  email: String;
  password: String;
  token?: String;
}

const userSchema: Schema = new Schema(
  {
    name: String,
    email: String,
    password: String,
    token: String,
  },
  {
    timestamps: true,
  },
);

export default mongoose.model<IUser>('Users', userSchema);
