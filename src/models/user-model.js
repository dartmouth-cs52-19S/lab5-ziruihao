import mongoose, { Schema } from 'mongoose';

import bcrypt from 'bcryptjs';

const UserSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  password: String,
  name: {
    first: String,
    last: String,
  },
  imageURL: String,
}, {
  toJSON: {
    virtuals: true,
  },
});

UserSchema.methods.comparePassword = function comparePassword(candidatePassword, callback) {
  const user = this;
  bcrypt.compare(candidatePassword, user.password, (error, result) => {
    if (error) {
      return callback(error);
    } else {
      return callback(null, result);
    }
  });
};

UserSchema.pre('save', function beforeUserSave(next) {
  // this is a reference to our model
  // the function runs in some other context so DO NOT bind it
  const user = this;
  if (user.isModified('password')) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(user.password, salt);
    user.password = hash;
  }
  return next();
  // when done run the **next** callback with no arguments
  // call next with an error if you encounter one
  // return next();
});

const UserModel = mongoose.model('Post', UserSchema);

export default UserModel;
