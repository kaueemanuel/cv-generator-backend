import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcrypt';
const SALT_WORK_FACTOR = 10;

export interface IUser extends Document {
  name: string;
  username: string;
  email: string;
  password: string;
  token?: string;
}

const userSchema: Schema<IUser> = new Schema<IUser>(
  {
    name: {
      type: Schema.Types.String,
      required: true,
    },
    username: {
      type: Schema.Types.String,
      required: true,
      unique: true,
    },
    email: {
      type: Schema.Types.String,
      required: true,
    },
    password: {
      type: Schema.Types.String,
      required: true,
      unique: true,
    },
    token: {
      type: Schema.Types.String,
      required: false,
    },
  },
  {
    timestamps: true,
  },
);

userSchema.pre('save', function (next) {
  let user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next();

  // generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
    if (err) return next(err);

    // hash the password using our new salt
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);
      // override the cleartext password with the hashed one
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

export default mongoose.model<IUser>('Users', userSchema);
