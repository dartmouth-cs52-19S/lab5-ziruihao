import mongoose, { Schema } from 'mongoose';

import bcrypt from 'bcryptjs';

const UserSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  password: String,
  name: {
    first: String,
    last: String,
  },
  initials: String,
  imageURL: String,
}, {
  toJSON: {
    virtuals: true,
  },
});

UserSchema.methods.comparePassword = function comparePassword(candidatePassword, callback) {
  const user = this;
  // difference between return callback() versus just callback()?
  bcrypt.compare(candidatePassword, user.password, (error, isMatch) => {
    if (error) {
      return callback(error);
    } else {
      return callback(null, isMatch);
    }
  });
};

UserSchema.pre('save', function beforeUserSave(next) {
  const user = this;
  if (user.isModified('password')) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(user.password, salt);
    user.password = hash;
  }
  return next();
  // what's the difference between calling next with no arguments and just returning it?
});

const UserModel = mongoose.model('User', UserSchema);

export default UserModel;
